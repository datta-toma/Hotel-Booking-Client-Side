import { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';

const DetailsPage = () => {
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
 
    useEffect(() => {
        fetchRoomData();
    },[]);

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
            }, 1000); 
        } catch (error) {
            console.error('Error booking room:', error);
            setRoomData(prevRoomData => ({ ...prevRoomData, availability: true }));
           
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
                            <p className="py-3"><span className="text-xl font-medium">Descriptions: </span>{roomData.descriptions}</p>
                            <p className="py-1"><span className="text-xl font-medium">price_per_night: </span>{roomData.price_per_night}</p>
                            <p className="py-1"><span className="text-xl font-medium">Room Size: </span>{roomData.room_size}</p>
                            <p className="py-1"><span className="text-xl font-medium">Availability: </span>{roomData.availability ? 'Available' : 'Unavailable'}</p>
                            <p className="py-1"><span className="text-xl font-medium">Special Offers</span>{roomData.special_offers}</p>
                            {roomData.availability ? (
                                <Link to ={`/confirm/${id}`}>
                                     <button className="btn btn-primary mt-3" onClick={handleBooking}>Book Now</button>
                                </Link>
                               
                            ) : (
                                <p className="text-red-500">Unavailable</p>
                            )}     
                        </div>
                    </div>
                )}
            </div>

            
        </div>
    );
};

export default DetailsPage;
