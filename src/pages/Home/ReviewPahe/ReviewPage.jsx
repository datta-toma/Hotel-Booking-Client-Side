import { useState, useEffect } from 'react';


const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5000/reviews'); // Adjust the endpoint accordingly
            if (response.ok) {
                const data = await response.json();
                // Sort reviews in descending order based on timestamp
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
                <div className='flex flex-col md:flex-row justify-center md:gap-8 overflow-y-auto h-14 border-6  border-gray-300 shadow-lg rounded-xl mb-5 w-full p-4'>
                    <h3 className="font-bold">UserName: {review.username}</h3>
                    <p className="font-bold">Comment: {review.text}</p>
                    <p className="font-bold">Rating: {review.rating}</p>
                </div>  
            </div>
        ));
    };

    return (
        <div >
            <h2 className='text-5xl font-extrabold text-center mt-9'>Reviews</h2>
            <div className=' flex justify-center mt-5'>
            <div className="carousel carousel-vertical">
                {renderReviews()}
            </div> 
            </div>
        </div>
    );
};

export default ReviewPage;
