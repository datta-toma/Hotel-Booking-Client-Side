import { Link } from "react-router-dom";


const FeaturedCard = ({room}) => {
    const {_id, room_img, descriptions} = room;
    return (
        <div>
           <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src={room_img} alt="Shoes" /></figure>
                <div className="card-body">
                <p><span className="font-medium text-xl">Descriptions: </span>    {descriptions}<span className="font-medium">Read More</span></p>
                
                    <div className="card-actions justify-center">
                        <Link to={`/details/${_id}`}>
                        <button className="btn btn-wide text-xl">Book Now</button>
                        </Link>
                 
                 
                    </div>
                </div>
                </div>
        </div>
    );
};

export default FeaturedCard;