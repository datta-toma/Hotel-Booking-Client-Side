import Banner from "../Banner/Banner";
import FeaturedRooms from "../FeaturedRooms/FeaturedRooms";
import Map from "../Map/Map";
import NewsLetter from "../NewsLetter/NewsLetter";
import { useState, useEffect } from "react";
import ReviewPage from "../ReviewPahe/ReviewPage";
import SpecialOffer from "../SpecialOffer/SpecialOffer";
import { Helmet } from "react-helmet-async";



const Home = () => {
    const [roomCards, setRoomCards] = useState([]);

    useEffect(() => {
        fetch("https://hotel-server-eta.vercel.app/Rooms") // Update with your data source URL
            .then((res) => res.json())
            .then((data) => setRoomCards(data))
            .catch((error) => console.error("Error fetching rooms:", error));
    }, []); 

    return (
        <div className="bg-gradient-to-r from-sky-200 to-slate-300 p-5">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedRooms roomCards={roomCards}></FeaturedRooms>
            <SpecialOffer></SpecialOffer>
            <NewsLetter></NewsLetter>
            <ReviewPage></ReviewPage>
            <Map></Map>
        </div>
    );
};

export default Home;