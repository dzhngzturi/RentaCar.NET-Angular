using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId,
            string basketId, Address shippingAddress)
        {
            decimal lateFee = 0;
            // get basket from the repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var specs = new CarWithBrandsAndTypesSpecification(item.Id);
                var carItem = await _unitOfWork.Repository<Car>().GetEntityWithSpec(specs);

                var itemOrdered = new CarItemOrdered(carItem.Id, carItem.Name,
                    carItem.Photos.FirstOrDefault(x => x.IsMain).PictureUrl);

                var orderItem = new OrderItem(itemOrdered, carItem.Price, item.Quantity
                , item.DateRent, item.DateReturn,
                (item.DateReturn.Date - item.DateRent.Date).Days, false, lateFee);

                items.Add(orderItem);
            }


            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // calc subtotal
            var total = items.Sum(item => item.Price * (int)(item.ReturnDate - item.RentDate).TotalDays);
            //  var subtotal = items.Sum(item => item.Price * item.Quantity);

            //check if order exists
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.Id);
            }


            // create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, total, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // return order
            return order;

        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int Id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(Id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }

        public async Task<List<Order>> GetOrdersForAdminAsync()
        {
            var spec = new OrdersWithItemsAndOrderingSpecification();
            return await _unitOfWork.Repository<Order>().ListForAdminAsync(spec);
        }

        public async Task<Order> GetOrdersByIdForAdminAsync(int id)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<bool> CheckCarAvailable(int id)
        {
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);
            var orderedCar = await _unitOfWork.Repository<OrderItem>().ListAllAsync();

            if (car != null)
            {
                foreach (var item in orderedCar)
                {
                    if (item.ItemOrdered.CarItemId == car.Id)
                    {
                        if (item.CarReturned == true)
                        {
                            if (item.ReturnDate >= DateTime.Now)
                            {
                                car.Available = true;
                            }
                        }
                        else
                        {
                            car.Available = false;
                        }
                    }
                }
            }
            return car.Available;
        }

        public async Task<bool> CheckCarReturned(int id, bool returned = false)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
            var orderItems = await _unitOfWork.Repository<OrderItem>().GetByIdAsync(order.Id);
            var car = await _unitOfWork.Repository<Car>().GetByIdAsync(id);

            if (orderItems != null)
            {
                var items = new List<OrderItem>();

                if (orderItems.CarReturned == returned)
                {
                    DateTime dateNow = DateTime.Now;
                    orderItems.CarReturned = false;
                    car.Available = false;
                    orderItems.LateReturnedFee = (dateNow - orderItems.ReturnDate).Days * orderItems.Price + (orderItems.Price / 2);
                    items.Add(orderItems);
                    // save to db
                    await _unitOfWork.Complete();
                }
                else
                {
                    orderItems.CarReturned = true;
                    orderItems.LateReturnedFee = 0;
                    car.Available = true;
                    items.Add(orderItems);
                    // save to db
                    await _unitOfWork.Complete();
                }
            }
            return orderItems.CarReturned;
        }
    }
}
