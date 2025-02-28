import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const DetailsPage = () => {
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        Aos.init( );
    }, []);

    // modal
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        date: '',
        RoomID: roomData?.room_id ?? '',
        price: roomData?.price_per_night ?? '',
        description: roomData?.descriptions ?? '',
        
    });

    const toggleModal = () => {
        setShowModal(!showModal); 
    };
  
    useEffect(() => {
        const fetchRoomData = async () => {
        try {
            const response = await fetch(`https://hotel-server-eta.vercel.app/Rooms/${id}`);
            if (response.ok) {
                const data = await response.json();
                setRoomData(data);
                setFormData(prevFormData => ({
                    ...prevFormData, RoomID: data.room_id
                }));
            } else {
                console.error('Failed to fetch room data');
            }
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch(`https://hotel-server-eta.vercel.app/reviews`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


        fetchRoomData();
        fetchReviews(); 
    }, [id]);

     //  modal from 
   
     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://hotel-server-eta.vercel.app/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    date: formData.date,
                    RoomID: formData.RoomID,
                    price: formData.price,
                    description: formData.description
                })
            });
            if (response.ok) {
                console.log('Booking confirmed and saved to database!');
                setShowModal(true); 
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: 'Your booking has been confirmed and saved to the database.'
                });
                history.push(`/room/${id}`);
            } else {
                console.error('Failed to save booking to database');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };
    
    
    const handleBooking = async () => {
        try {
            setRoomData(prevRoomData => ({ ...prevRoomData, availability: false }));
            setIsBooking(true);
            setShowModal(true);
            setTimeout(async () => {
                const response = await fetch(`https://hotel-server-eta.vercel.app/Rooms/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    console.log('Room booked successfully!');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to book the room:', errorData.message);
                    setRoomData(prevRoomData => ({ ...prevRoomData, availability: true }));
                }
            });
        } catch (error) {
            console.error('Error booking room:', error);
            setIsBooking(false);
        }
    };

 
    return (
        <div className='bg-gradient-to-r from-sky-200 to-slate-300 p-5'>
            <Helmet>
                <title>Room Details</title>
            </Helmet>
            <h2 className="text-5xl font-extrabold mt-5 text-center" data-aos="flip-left">Details Page</h2>
            <div className="hero mt-12 ">
                {roomData && (
                    <div className="hero-content flex-col lg:flex-row gap-32" data-aos="fade-down-right">
                        <img src={roomData.room_img} className="max-w-sm rounded-lg shadow-2xl" />
                        <div data-aos="fade-down-left">
                            <p><span className="text-xl font-medium">Room ID: </span>{roomData.room_id}</p>
                            <p className="py-3"><span className="text-xl font-medium">Descriptions: </span>{roomData.descriptions}</p>
                            <p className="py-1"><span className="text-xl font-medium">Price Per Night: </span>{roomData.price_per_night}</p>
                            <p className="py-1"><span className="text-xl font-medium">Room Size: </span>{roomData.room_size}</p>
                            <p className="py-1"><span className="text-xl font-medium">Availability: </span>{roomData.availability ? 'Available' : 'Unavailable'}</p>
                            {!isBooking && roomData.availability && (
                               
                                    <button className="btn btn-primary mt-3" onClick={handleBooking}>Book Now</button>
                               
                            )}
                        </div>
                    </div>
                )}
                {/* Modal */}
                {showModal && (
                    <dialog open className="modal" id="my_modal_8">
                        <div className="modal-box bg-gradient-to-r from-sky-200 to-blue-500">
                            <h3 className="font-bold text-2xl text-center"  data-aos="flip-left">Confirm Booking</h3>
                            <div className='mt-20 text-center'>
            <form onSubmit={handleSubmit}>

                    <div className='space-y-4' >
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" data-aos="fade-down-right"></input>

                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center " data-aos="fade-down-left"></input> 
                    </div>

                    <div className='space-y-4 mt-4'>
                       
                        <input type="text" name="RoomID" placeholder="Room ID" value={formData.RoomID} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" data-aos="fade-up-right"></input> 

                      
                        <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" data-aos="fade-up-left"></input> 
                    </div>


                    <div className='space-y-7 mt-4'>
                   
                        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center"  data-aos="fade-down-right"></input>

                        
                        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" data-aos="fade-down-left"></input> 
                    </div>
                    <div className='mt-7 mb-5 '>
                        <button type="submit" className="btn btn-wide btn glass font-extrabold " data-aos="flip-up">Confirm</button>
                    </div>
                    
                    </form>
            </div>
                         <button className="btn btn glass font-bold" onClick={toggleModal}>Close</button>
                        </div>
                    </dialog>
                )}

            </div>
    
            <div>
                <h3 className="text-3xl font-bold mt-8 text-center" data-aos="fade-down-left">Reviews</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5' data-aos="fade-up-right">
                     {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                         <div key={index} className="border rounded p-4">
                                <p>Username: {review.username}</p>
                                <p>Text: {review.text}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Timestamp: {review.timestamp}</p>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No review</p>
                        )}
                    </div>
                </div>

             


        </div>
    );
    
};

export default DetailsPage;
