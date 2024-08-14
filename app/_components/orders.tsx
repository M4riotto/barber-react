
import getAllBookings from "../_actions/get-all-booking";
import Teste from "./teste";

const Orders = async () => {
    const bookings = await getAllBookings()

    const now = new Date(); // Data e hora atuais
    // Filtra reservas futuras
    const filteredBookings = bookings.filter(booking => new Date(booking.date) >= now);


    return (
        <>
            <div>

                <div>
                    <h2 className="text-bold">Orders</h2>
                    <p className="text-sm">Recent orders from app</p>
                </div>

                <div className="space-y-2 sm:space-x-2 sm:grid-cols-2 grid grid-cols-1">
                    {filteredBookings.map(booking => (
                        <Teste key={booking.id} booking={booking} />
                    ))}

                </div>

            </div>
        </>
    );
}

export default Orders;