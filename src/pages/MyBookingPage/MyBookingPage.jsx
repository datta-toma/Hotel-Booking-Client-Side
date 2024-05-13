import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import Swal from 'sweetalert2';
import './bookingPage.css';
import axios from "axios";
import useAxiosSecure from "../hook/useAxiosSecure";

const MyBookingPage = () => {
    const {user} = useAuth();
    const [bookings, setBookings] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const axiosSecure = useAxiosSecure();
  

    useEffect(() => {
        if (user) {
            const url = `/bookings?email=${user.email}`;

            axiosSecure.get(url)
            .then(res =>{
                setBookings(res.data);
            })
            // fetch(url)
            //     .then(res => res.json())
            //     .then(data => setBookings(data))
        } 
    }, [user, axiosSecure]); 

    // cancel
    const handleCancelBooking = (id) => {
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
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: 'DELETE',
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Your booking has been canceled.',
                            icon: 'success',
                        });
                        const updatedBookings = bookings.filter(booking => booking._id !== id);
                        setBookings(updatedBookings);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to cancel booking.',
                            icon: 'error',
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error canceling booking:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to cancel booking.',
                        icon: 'error',
                    });
                });
            }
        });
    };


    // update date
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
       
    };


    // review
    const handleReviewSubmit = async (bookingId) => {
        try {
            if (!reviewText || rating < 1 || rating > 5) {
                throw new Error('Invalid review data');
            }

            const reviewData = {
                bookingId: bookingId,
                review: {
                    text: reviewText,
                    rating: rating
                }
            };

            const response = await fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            setReviewText('');
            setRating(0);

            Swal.fire({
                title: 'Success!',
                text: 'Your review has been submitted.',
                icon: 'success',
            });
        } catch (error) {
            console.error('Error submitting review:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit review.',
                icon: 'error',
            });
        }
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
                        <th>update date</th>
                       
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
                                    <td>
                                    <input
                                        type="date"
                                        value={booking.date}
                                        onChange={(e) => handleUpdateDate(booking._id, e.target.value)}
                                    />
                                    </td>
                                </td>

                                <td>
                                   
                                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review..." required />
                                    <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} min={1} max={5} placeholder="Rating (1-5)" required />
                                    <button className="btn btn glass" onClick={() => handleReviewSubmit(booking._id)}>Submit Review</button>
                                </td>


                                    
                                
                                <td>
                                <button className="btn btn glass" onClick={() => handleCancelBooking(booking._id)}> Cancel </button>
                                
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
