import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DetailsPage = () => {
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(!showModal); // Toggle modal visibility
    };
  
    useEffect(() => {
        const fetchRoomData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/Rooms/${id}`);
            if (response.ok) {
                const data = await response.json();
                setRoomData(data);
                // Update formData with room ID when roomData changes
                setFormData(prevFormData => ({
                    ...prevFormData,
                    RoomID: data.room_id
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
            const response = await fetch(`http://localhost:5000/reviews`);
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
            const response = await fetch('http://localhost:5000/bookings', {
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
                // Update room availability status in frontend
                setShowModal(true); // Close the modal after successful submission
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: 'Your booking has been confirmed and saved to the database.'
                });
                // Redirect to the room page
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
                const response = await fetch(`http://localhost:5000/Rooms/${id}`, {
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
        <div>
            <h2 className="text-5xl font-extrabold mt-10 text-center">Details Page</h2>
            <div className="hero mt-12 ">
                {roomData && (
                    <div className="hero-content flex-col lg:flex-row gap-32">
                        <img src={roomData.room_img} className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
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
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Confirm Booking</h3>
                            <div className='mt-20 text-center'>
            <form onSubmit={handleSubmit}>

                    <div className='space-y-4'>
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" />

                        <label className='ml-6'>Name:</label>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center " />
                    </div>

                    <div className='space-y-4 mr-7'>
                        <label>Room ID:</label>
                        <input type="text" name="RoomID" placeholder="Room ID" value={formData.RoomID} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" />

                        <label className='ml-9'>Date:</label>
                        <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center"/> 
                    </div>


                    <div className='space-y-7'>
                    <label className='ml-7'>Price:</label>
                        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" />

                        <label className='ml-6'>Description:</label>
                        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" />
                    </div>
                    <div className='mt-7 mb-5 '>
                    {/* <p className="py-1">
                        <span className="text-xl font-medium">Availability: </span>
                        {formData && formData.availability ? 'Available' : 'Unavailable'}
                    </p> */}
                        <button type="submit" className="btn btn-wide ">Confirm</button>
                    </div>
                    
                    </form>
            </div>
                            {/* Add your modal content here */}
                            <button className="btn" onClick={toggleModal}>Close</button>
                        </div>
                    </dialog>
                )}

            </div>
    
            <div>
                <h3 className="text-3xl font-bold mt-8 text-center">Reviews</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
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
                            <p>No reviews available</p>
                        )}
                    </div>
                </div>

             


        </div>
    );
    
};

export default DetailsPage;
