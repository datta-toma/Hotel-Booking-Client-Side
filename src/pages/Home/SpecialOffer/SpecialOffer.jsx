import { useEffect, useState } from 'react';
import OfferPage from './OfferPage';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SpecialOffer = () => {
    const [specials, setSpecials] = useState([]);

    useEffect(() => {
        Aos.init( );
    }, []);
    
    useEffect(() => {
        fetch('special.json') 
            .then((res) => res.json())
            .then((data) => setSpecials(data));
    }, []); 

    return (
        <div data-aos="flip-down">
        <h2 className='md:text-5xl  text-3xl font-extrabold text-center mt-6'>Special Offers</h2>
        <h3 className='md:text-3xl  text-xl font-extrabold text-center mt-4'>Find Your Excuset Book A Stay</h3>
        <p className='text-center md:font-medium mt-4'>Form discounted rates to extra special. Specials find our<br></br> latest offers here. If you don't , someone else will.</p>
        <div className=' grid md:grid-cols-2 lg:grid-cols-3 ml-20 mt-8 gap-3'>
            {
                specials.map((offer, index)=> <OfferPage key={index} offer={offer}></OfferPage> )
            }
        </div>
       
   
      </div>
    );
};

export default SpecialOffer;