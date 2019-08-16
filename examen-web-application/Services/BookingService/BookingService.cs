using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.BookingService
{
    public class BookingService
    {
        //doar client
        public IEnumerable<object> GetBookings(int loggedUserID)
        {
            return null;
        }

        //doar adminul
        public IEnumerable<object> GetBookingsAdm()
        {
            return null;
        }

        public void UpsertBooking(int loggedUserID)
        {

        }

        public void UpsertBookingReception()
        {
            //contina pt cine
        }
    }
}
