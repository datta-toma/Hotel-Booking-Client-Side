import { useLoaderData } from "react-router-dom";


const DetailsPage = () => {
    const RoomsData = useLoaderData();
    console.log(RoomsData)
    const { room_img, descriptions, price_per_night, room_size, availability, special_offers } = RoomsData;


    return (
        <div>
             <h2 className="text-5xl font-extrabold mt-10 text-center">Details Page</h2>
            <div className="hero mt-7 ">
                <div className="hero-content flex-col lg:flex-row gap-32">
                    <img src={room_img} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                    <p className="py-3"><span className="text-xl font-medium">Descriptions: </span>  {descriptions}</p>
                    <p className="py-1"><span className="text-xl font-medium">price_per_night: </span>  {price_per_night}</p>
                    <p className="py-1"><span className="text-xl font-medium">Room Size: </span>  {room_size}</p>
                    <p className="py-1"><span className="text-xl font-medium">Availability </span>  {availability}</p>
                    <p className="py-1"><span className="text-xl font-medium">Special Offers</span>  {special_offers}</p>
                    <button className="btn btn-primary mt-3">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;