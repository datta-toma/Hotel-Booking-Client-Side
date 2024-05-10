

const RoomsCard = ({roomCard}) => {
    const {_id,  room_img, descriptions, price_per_night, room_size, availability, special_offers } = roomCard;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={room_img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body ">
                    <p><span className="font-medium text-xl">Descriptions: </span>    {descriptions}<span className="font-medium">Read More</span></p>
                    <p><span className="font-medium text-xl">Price_Per_Night: </span> ${price_per_night}</p>
                    <p><span className="font-medium text-xl">Room Size: </span> {room_size}</p>
                    <p><span className="font-medium text-xl">Availability: </span> { availability}</p>
                    <p><span className="font-medium text-xl">Special Offers: </span> { special_offers }</p>
                    <div className="card-actions ">
                    <button className="btn btn-wide ">Book Now</button>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default RoomsCard;