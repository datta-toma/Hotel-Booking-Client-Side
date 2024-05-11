import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [showModal, setShowModal] = useState(false);
   
    useEffect(() => {
        fetchRoomData();
    },[]);

    useEffect(() => {
        if (showModal) {
            document.getElementById('my_modal_1').showModal();
        }
    }, [showModal]);

    const fetchRoomData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/Rooms/${id}`);
            if (response.ok) {
                const data = await response.json();
                setRoomData(data);
            } else {
                console.error('Failed to fetch room data');
            }
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };

    const handleBooking = async () => {
        try {
            setRoomData(prevRoomData => ({ ...prevRoomData, availability: false }));
            setShowModal(true);

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
        } catch (error) {
            console.error('Error booking room:', error);
            setRoomData(prevRoomData => ({ ...prevRoomData, availability: true }));
        }
    };

    const handleConfirmBooking = async () => {
        try {
            setShowModal(false);
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
   
    return (
        <div>
            <h2 className="text-5xl font-extrabold mt-10 text-center">Details Page</h2>
            <div className="hero mt-12 ">
                {roomData && (
                    <div className="hero-content flex-col lg:flex-row gap-32">
                        <img src={roomData.room_img} className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <p className="py-3"><span className="text-xl font-medium">Descriptions: </span>{roomData.descriptions}</p>
                            <p className="py-1"><span className="text-xl font-medium">price_per_night: </span>{roomData.price_per_night}</p>
                            <p className="py-1"><span className="text-xl font-medium">Room Size: </span>{roomData.room_size}</p>
                            <p className="py-1"><span className="text-xl font-medium">Availability: </span>{roomData.availability ? 'Available' : 'Unavailable'}</p>
                            <p className="py-1"><span className="text-xl font-medium">Special Offers</span>{roomData.special_offers}</p>
                            {roomData.availability ? (
                                <button className="btn btn-primary mt-3" onClick={handleBooking}>Book Now</button>
                            ) : (
                                <p className="text-red-500">Unavailable</p>
                            )}     
                        </div>
                    </div>
                )}
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Room Summary</h3>
                    {roomData && (
                        <div>
                            <p>Descriptions: {roomData.descriptions}</p>
                            <p>Price Per Night: {roomData.price_per_night}</p>
                            <p>Room Size: {roomData.room_size}</p>
                            <p>Special Offers: {roomData.special_offers}</p>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={handleConfirmBooking}>Confirm Booking</button>
                            <button className="btn" onClick={handleCloseModal}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DetailsPage;
