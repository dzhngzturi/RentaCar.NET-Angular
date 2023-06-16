using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {

        public OrderItem()
        {
        }

        public OrderItem(CarItemOrdered itemOrdered, decimal price, int quantity
            , DateTime rentDate, DateTime returnDate, int days, bool carReturned, decimal lateReturnedFee
            )
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
            RentDate = rentDate;
            ReturnDate = returnDate;
            Days = days;
            CarReturned = carReturned;
            LateReturnedFee = lateReturnedFee;
        }

        public CarItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime RentDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int Days { get; set; }
        public bool CarReturned { get; set; }
        public decimal LateReturnedFee { get; set; }
    }
}
