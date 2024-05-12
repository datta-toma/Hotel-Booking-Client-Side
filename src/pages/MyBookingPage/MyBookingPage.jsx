import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import Swal from 'sweetalert2';
import './bookingPage.css';

const MyBookingPage = () => {
    const {user} = useAuth();
    const [bookings, setBookings] = useState([]);
    const [bookingToCancel] = useState(null);

    useEffect(() => {
        if (user) {
            const url = `http://localhost:5000/bookings?email=${user.email}`;
            fetch(url)
                .then(res => res.json())
                .then(data => setBookings(data))
        } 
    }, [user]); 

    const handleCancelBooking =  (bookingId) => {
         Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to cancel this booking?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:5000/bookings/${bookingId}`,{
                    method: 'DELETE',
                    })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.deletedCount > 0) {
                        Swal.fire({
                          title: " Success Cancel!",
                          text: "Your craft item has been deleted.",
                          icon: "success",
                        });
          
                        const remainingItems = bookings.filter(booking => booking._id !== bookingId);
                        setBookings(remainingItems);
                      }
                    });
                }
              });

       
    };

    const handleUpdateDate = (bookingId, newDate) => {
        fetch(`http://localhost:5000/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: newDate }) 
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Update successful:', data);
            const updatedBookings = bookings.map(booking => {
                if (booking._id === bookingId) {
                    return { ...booking, date: newDate };
                }
                return booking;
            });
            setBookings(updatedBookings);
            Swal.fire({
                title: "Success!",
                text: "Booking date has been updated.",
                icon: "success",
            });
        })
        .catch((error) => {
            console.error('Error updating booking date:', error);
        });
    };
    return (
        <div className="booking-page">
            <h2 className="text-5xl font-extrabold mt-10 text-center">Room Booking List</h2>
            <div className="table-container mt-5">
                <table className="table ">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Room ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th></th>
                       
                    </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.RoomID}</td>
                                <td>{booking.email}</td>
                                <td>{booking.name}</td>
                                <td>{booking.description}</td>
                                <td>{booking.price}</td>
                                <td>{booking.date}</td>
                                <td>
                                    <input
                                        type="date"
                                        value={booking.date}
                                        onChange={(e) => handleUpdateDate(booking._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                <button className="btn btn glass" onClick={() => handleCancelBooking(bookingToCancel)}> Cancel </button>
                                
                              </td> 
                            </tr>
                        ))}
                    </tbody> 
                    
                </table>
                </div>

        </div>
    );
};

export default MyBookingPage;
