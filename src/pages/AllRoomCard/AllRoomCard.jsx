import { useEffect, useState } from "react";
import RoomsCard from "./RoomsCard";
import Aos from 'aos';
import 'aos/dist/aos.css';


const AllRoomCard = () => {
    const [roomCards, setRoomCards] = useState([]);


    useEffect(() => {
        Aos.init( );
    }, []);

    
    useEffect(() =>{
        fetch('http://localhost:5000/Rooms')
        .then(res => res.json())
        .then(data => setRoomCards(data));
    }, []);


    return (
        <div className="bg-gradient-to-r from-sky-200 to-slate-300 p-5">
            <h2 className="text-5xl font-extrabold mt-10 text-center" data-aos="flip-left">Hotel Rooms List</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:m-28">
            {
                roomCards.map(roomCard =><RoomsCard
                key={roomCard._id} roomCard={roomCard}
                ></RoomsCard>)
            }
           </div>
        </div>
    );
};

export default AllRoomCard;