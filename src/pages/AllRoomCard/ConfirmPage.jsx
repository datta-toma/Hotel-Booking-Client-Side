import { useState } from 'react';
import Swal from 'sweetalert2';

const ConfirmPage = ({ roomId, roomData }) => {

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        date: '',
        RoomID: roomData?.room_id ?? '',
        price: roomData?.price_per_night ?? '',
        description: roomData?.descriptions ?? '',
        
    });

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
                    roomId: roomId,
                    email: formData.email,
                    name: formData.name,
                    date: formData.date,
                    RoomID: formData.room_id,
                    price: formData.price,
                    description: formData.description
                })
            });
            if (response.ok) {
                console.log('Booking confirmed and saved to database!');
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: 'Your booking has been confirmed and saved to the database.'
                });
                
            } else {
                console.error('Failed to save booking to database');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };



    return (
        <div>
            <h2 className="text-5xl font-extrabold mt-10 text-center">Confirm Booking Room</h2>
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
                        <input type="text" name="room_id" placeholder="Room ID" value={formData.room_id} onChange={handleChange} required  className="input input-bordered w-full max-w-xs text-center" />

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
                    <p className="py-1">
                        <span className="text-xl font-medium">Availability: </span>
                        {formData && formData.availability ? 'Available' : 'Unavailable'}
                    </p>
                        <button type="submit" className="btn btn-wide ">Confirm</button>
                    </div>
                    
                    </form>
            </div>
            
        </div>
    );
};

export default ConfirmPage;