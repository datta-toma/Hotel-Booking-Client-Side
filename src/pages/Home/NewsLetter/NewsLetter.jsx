import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const NewsLetter = () => {

    useEffect(() => {
        Aos.init( );
    }, []);

    return (
        <div>
            <div className="text-center space-y-3 mt-8"  data-aos="flip-right">
                <h2 className="md:text-5xl text-3xl font-extrabold">NewsLetter SignUp</h2> 
                <p> To receive updates on our latest news, packages, exclusive offers and upcoming events, please complete the form below.<br></br> You may opt out from receiving promotions at any time by clicking the unsubscribe link in the newsletter.</p>
            </div>

            <div className="text-center space-y-3 mt-7">
                <h3 className="text-3xl font-bold"  data-aos="flip-right">Contact Details</h3>
                <div data-aos="fade-down-left">
                <input type="text" placeholder="First Name" className="input input-ghost w-full max-w-xs mt-5 font-bold" />
                <input type="text" placeholder="Last Name" className="input input-ghost w-full max-w-xs font-bold" />
                </div>
                <div data-aos="fade-down-right">
                <input type="email" placeholder="Email" className="input input-ghost w-full max-w-xs font-bold" />
                <input type="text" placeholder="Postal/Zip code" className="input input-ghost w-full max-w-xs font-bold" />
                </div>
                <div className="flex gap-2 justify-center" data-aos="fade-up-left">
                <input type="checkbox" defaultChecked className="checkbox" />
                <p>Yes! send me emails and exclusive offers frome watercolor Inn & Resorts and other St. Joe affiliated hotels. By clicking submit, I read and agree with the <span className="text-blue-500"><a href="#">Privacy Policy</a></span></p>
                </div>
                <button className="btn glass font-extrabold"  data-aos="flip-left">SUBMIT</button>
            </div>
           
        </div>
    );
};

export default NewsLetter;