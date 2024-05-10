import Banner from "../Banner/Banner";
import FeaturedRooms from "../FeaturedRooms/FeaturedRooms";
import Map from "../Map/Map";
import NewsLetter from "../NewsLetter/NewsLetter";
import { useState, useEffect } from "react";



const Home = () => {
    const [roomCards, setRoomCards] = useState([]);

    useEffect(() => {
        fetch("rooms.json") // Update with your data source URL
            .then((res) => res.json())
            .then((data) => setRoomCards(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []); 

    return (
        <div>
            <Banner></Banner>
            <FeaturedRooms roomCards={roomCards}></FeaturedRooms>
            <NewsLetter></NewsLetter>
            <Map></Map>
        </div>
    );
};

export default Home;