import { useState, useEffect } from "react"; 
import FeaturedCard from "./FeaturedCard";
import Aos from 'aos';
import 'aos/dist/aos.css';

const FeaturedRooms = ({ roomCards }) => {
    const [roomsToShow, setRoomsToShow] = useState([]);

    useEffect(() => {
        Aos.init( );
    }, []);

    useEffect(() => {
        if (roomCards && roomCards.length > 0) {
            setRoomsToShow(roomCards.slice(0, 9)); // Change to slice the first 9 rooms
        }
    }, [roomCards]);

    return (
        <div data-aos="flip-left">
            <h3 className="text-5xl mt-9 text-center font-extrabold">Featured Rooms</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 lg:m-28">
                {roomsToShow.map((room) => (
                    <FeaturedCard key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedRooms;
