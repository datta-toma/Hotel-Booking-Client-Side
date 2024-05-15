import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import Swal from 'sweetalert2';
import './bookingPage.css';
import axios from "axios";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet-async";

const MyBookingPage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [username, setUsername] = useState(''); 
    const [rating, setRating] = useState(0);
  



    useEffect(() => {
        Aos.init();
    }, []);


    useEffect(() => {
        if (user) {
          fetchBookings(user.email);
        }
      }, [user]);
    
      const fetchBookings = async (email) => {
        try {
          const response = await fetch(`https://hotel-server-eta.vercel.app/bookings?email=${email}`, {
            method: 'GET',
            credentials: 'include' 
          });
          if (!response.ok) {
            throw new Error('Failed to fetch bookings');
          }
          const data = await response.json();
          setBookings(data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      

    // useEffect(() => {
    //     if (user) {
    //         const url = `https://hotel-server-eta.vercel.app/bookings?email=${user.email}`;

    //         // axios.get(url, { withCredentials: true })
    //         //     .then(res => {
    //         //         setBookings(res.data);
    //         //     })

    //         fetch(url,{ credentials: "include"})
    //         .then(res => res.json())
    //         .then(data => setBookings(data))

    //         .catch(error => {
    //              console.error('Error fetching bookings:', error);
    //                 // Handle error
    //         });
    //     }
    // }, [user]);

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
                fetch(`https://hotel-server-eta.vercel.app/bookings/${id}`, {
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

    // update Date
    const handleUpdateDate = (bookingId, newDate) => {
        fetch(`https://hotel-server-eta.vercel.app/bookings/${bookingId}`, {
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
            if (!username) {
                throw new Error('Username is required');
            }

            if (!reviewText || rating < 1 || rating > 5) {
                throw new Error('Invalid review data');
            }

            const reviewData = {
                bookingId: bookingId,
                userName: user.name,
                review: {
                    username: username,
                    text: reviewText,
                    rating: rating,
                    timestamp: new Date().toISOString()
                }
            };

            const response = await fetch('https://hotel-server-eta.vercel.app/reviews', {
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
            setUsername('');
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
        <div className="booking-page bg-gradient-to-r from-sky-200 to-slate-300 p-5" data-aos="zoom-in-right">
            <Helmet>
                <title>Booked</title>
            </Helmet>
            <h2 className="text-5xl font-extrabold mt-10 text-center" data-aos="flip-down">Room Booking List</h2>
            <div className="table-container mt-5">
                <table className="table">
                    {/* Table header */}
                    <thead>
                        <tr>
                            <th>Room ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Update Date</th>
                            <th>User Review</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table body */}
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
                                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review..." required />
                                    <br></br>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Username" required />
                                    <label className="font-bold ml-6">Rating:</label>
                                    <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} min={1} max={5} placeholder="Rating (1-5)" required />
                                    <button className="btn btn glass font-bold ml-6" onClick={() => handleReviewSubmit(booking._id)}>Post</button>
                                </td>
                                <td>
                                    <button className="btn btn glass" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
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
