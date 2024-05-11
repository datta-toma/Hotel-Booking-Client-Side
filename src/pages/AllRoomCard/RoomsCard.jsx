import { Link } from "react-router-dom";


const RoomsCard = ({roomCard}) => {
    const {_id,  room_img, descriptions, availability } = roomCard;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <Link to={`/details/${_id}`}>
                    <img src={room_img} alt="img" className="rounded-xl" />
                    </Link>
                    
                </figure>
                <div className="card-body ">
                    <p><span className="font-medium text-xl">Descriptions: </span>    {descriptions}<span className="font-medium">Read More</span></p>
                    <div className="card-actions justify-center">
                        {availability ? (
                            <span className="text-green-500">Available</span>
                        ) : (
                            <span className="text-red-500">Unavailable</span>
                        )}
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default RoomsCard;


