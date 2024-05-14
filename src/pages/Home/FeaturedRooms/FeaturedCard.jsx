import { Link } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const FeaturedCard = ({room}) => {
    const {_id, room_img, descriptions} = room;

    useEffect(() => {
        Aos.init( );
    }, []);
    

    return (
        <div>
           <div className="card w-96 bg-base-100 shadow-xl" data-aos="fade-up">
                <figure data-aos="fade-down-right">
                    <img src={room_img} alt="Shoes" /></figure>
                <div className="card-body" data-aos="fade-down-left">
                <p><span className="font-medium text-xl">Descriptions: </span>    {descriptions}<span className="font-medium">Read More</span></p>
                
                    <div className="card-actions justify-center">
                        <Link to={`/details/${_id}`}>
                        <button className="btn btn-wide btn glass font-extrabold">Book Now</button>
                        </Link>
                 
                 
                    </div>
                </div>
                </div>
        </div>
    );
};

export default FeaturedCard;