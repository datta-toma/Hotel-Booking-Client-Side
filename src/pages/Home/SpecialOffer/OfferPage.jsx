import  { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const OfferPage = ({ offer }) => {
    const { img, discount, price } = offer;
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        Aos.init( );
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="offer-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="card card-compact w-96 bg-base-100 shadow-xl" data-aos="zoom-in-down">
                <figure style={{ position: 'relative' }}>
                    <img src={img} alt="img" />
                    {isHovered && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', padding: '20px', borderRadius: '5px' }}>
                            <p>Discount: {discount}</p>
                            <p>Price: {price}</p>
                        </div>
                    )}
                </figure>
               
            </div>
        </div>
    );
};

export default OfferPage;
