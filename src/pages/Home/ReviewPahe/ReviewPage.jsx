import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        Aos.init( );
    }, []);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('https://hotel-server-eta.vercel.app/reviews'); 
            if (response.ok) {
                const data = await response.json();
                const sortedReviews = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setReviews(sortedReviews);
            } else {
                console.error('Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const renderReviews = () => {
        return reviews.map((review, index) => (
            <div key={index} >
                <div className='flex  md:flex-row justify-center gap-3 md:gap-8 overflow-x-auto h-12 border-6  border-gray-300 shadow-lg rounded-xl mb-5  p-4' data-aos="flip-up">
                    <p className="font-bold">UserName: {review.username}</p>
                    <p className="font-bold">Comment: {review.text}</p>
                    <p className="font-bold">Rating: {review.rating}</p>
                    <p className="font-bold">Timestamp: {new Date(review.timestamp).toLocaleString()}</p>
                </div>  
            </div>
        ));
    };

    return (
        <div >
            <h2 className='text-5xl font-extrabold text-center mt-9' data-aos="flip-down">Reviews</h2>
            <div className=' flex justify-center mt-5'data-aos="flip-up">
            <div className="carousel carousel-vertical" >
                {renderReviews()}
            </div> 
            </div>
        </div>
    );
};

export default ReviewPage;
