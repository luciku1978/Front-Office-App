using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using examen_web_application.Services;
using examen_web_application.Services.BookingService;
using examen_web_application.Services.BookingService.dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : BaseController
    {
        IBookingService BookingService;
        public BookingsController(IUserService userService, IBookingService bookingService):base(userService)
        {
            BookingService = bookingService;
        }

        [Route("GetBookingsAdm")]
        [HttpGet]
        public IActionResult GetBookingsAdm()
        {
            return Ok(BookingService.GetBookingsAdm(LoggedUserID));
        }

        [Route("UpsertBooking")]
        [HttpPost]
        public IActionResult UpsertBooking(BookingDTO dto)
        {
            BookingService.UpsertBooking(dto, LoggedUserID);
            return Ok();
        }


        [Route("UpsertBookingReception")]
        [HttpPost]
        public IActionResult UpsertBookingReception(BookingDTO dto)
        {
            BookingService.UpsertBookingReception(dto, LoggedUserID);
            return Ok();
        }

    }
}