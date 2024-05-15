import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useAuth from "../hook/useAuth";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet-async";

const RoomsCard = ({ roomCard,  }) => {
    const { _id, room_img, descriptions, availability } = roomCard;
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [username, setUsername] = useState(''); 
    const [rating, setRating] = useState(0); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();
   

    useEffect(() => {
        Aos.init( );
    }, []);

    useEffect(() => {
        console.log("Component mounted or _id changed");
        fetchTotalReviews();
    }, [_id]); 

    const fetchTotalReviews = async () => {
        try {
            const response = await fetch(`https://hotel-server-eta.vercel.app/Rooms/reviews/count/${_id}`);
            if (response.ok) {
                const data = await response.json();
                setTotalReviews(data.totalReviews);
            } else {
                console.error('Failed to fetch total review count');
            }
        } catch (error) {
            console.error('Error fetching total review count:', error);
        }
    };


    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!user) {
            console.log("Only logged-in users can submit reviews.");
            setIsSubmitting(false);
            return;
        }

    
        try {
            if (!username) {
                throw new Error('Username is required');
            }

            if (rating < 1 || rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }
            const reviewData = {
                roomId: _id,
                review: {
                    text: reviewText,
                    username: username,
                    rating: rating,
                    timestamp: new Date().toISOString() 
                }
            };
    
            const response = await fetch('https://hotel-server-eta.vercel.app/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
    
            fetchTotalReviews();
            setReviewText('');
            setUsername('');
            setRating(0); 
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <div>
            <Helmet>
                <title>Rooms List</title>
            </Helmet>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10" data-aos="fade-down-right">
                    <Link to={`/details/${_id}`}>
                        <img src={room_img} alt="img" className="rounded-xl" />
                    </Link>
                </figure>
                <div className="card-body " data-aos="fade-down-left">
                    <p><span className="font-medium text-xl">Descriptions: </span>{descriptions}<span className="font-medium">Read More</span></p>

                    <p>Total Reviews: {totalReviews}</p>

                    <form onSubmit={handleReviewSubmit}>
                        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review..." required/>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Username" required /> {/* Input field for username */}
                        <div>
                            <label>Rating: </label>
                            <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} min={1} max={5} placeholder="Rating (1-5)" required/>
                        </div>
                        <button className="btn btn glass" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
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
