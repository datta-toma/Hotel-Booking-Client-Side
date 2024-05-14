const handleReviewSubmit = async (bookingId) => {
    try {
        if (!user || !user.name) {
            throw new Error('Username is required');
        }
        
        if (!reviewText || rating < 1 || rating > 5) {
            throw new Error('Invalid review data');
        }

        const reviewData = {
            bookingId: bookingId,
            userName: user.name,
            review: {
                text: reviewText,
                rating: rating,
                timestamp: new Date().toISOString()
            }
        };

        const response = await fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        setReviewText('');
        setRating(0);

        Swal.fire({
            title: 'Success!',
            text: 'Your review has been submitted.',
            icon: 'success',
        });
    } catch (error) {
        console.error('Error submitting review:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to submit review.',
            icon: 'error',
        });
    }
};
