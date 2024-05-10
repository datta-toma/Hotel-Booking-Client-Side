// import { useState, useEffect } from "react"; 
// import FeaturedCard from "./FeaturedCard";

// const FeaturedRooms = ({ roomCards }) => {
//     const [roomsToShow, setRoomsToShow] = useState([]);

//     useEffect(() => {
//         if (roomCards && roomCards.length > 0) {
//             setRoomsToShow(roomCards.slice(0, 9)); // Change to slice the first 9 rooms
//         }
//     }, [roomCards]);

//     return (
//         <div>
//             <h3 className="text-4xl mt-5 text-center font-extrabold">Featured Rooms</h3>
//             <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 lg:m-28">
//                 {roomsToShow.map((room) => (
//                     <FeaturedCard key={room._id} room={room} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FeaturedRooms;
