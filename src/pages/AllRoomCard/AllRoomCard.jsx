import { useEffect, useState } from "react";
import RoomsCard from "./RoomsCard";


const AllRoomCard = () => {
    const [roomCards, setRoomCards] = useState([]);

    
    useEffect(() =>{
        fetch('rooms.json')
        .then(res => res.json())
        .then(data => setRoomCards(data));
    }, []);


    return (
        <div>
            <h2 className="text-5xl font-extrabold mt-10 text-center">All Rooms</h2>

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