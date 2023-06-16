﻿using API.DTO_s;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId,
                orderDto.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order!"));
            return Ok(order);
        }

        [HttpGet("getOrdersForAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<OrderDto>>> GetOrdersForAdmin()
        {
           // var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderService.GetOrdersForAdminAsync();
            return Ok(_mapper.Map<List<Order>, List<OrderToReturnDto>>(order));
        }

        [HttpGet("getOrderForAdmin/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForAdmin(int id)
        {
            var order = await _orderService.GetOrdersByIdForAdminAsync(id);
            if (order == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Order, OrderToReturnDto>(order);
        }
     

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderService.GetOrdersForUserAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(order));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await _orderService.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
           
            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethod")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }

        [HttpPut("checkCarReturned")]
        public async Task<ActionResult<bool>> CheckCarReturned(int id, bool returned)
        {
            var order = await _orderService.CheckCarReturned(id, returned);
            return Ok(order);
        }
    
    }
}
