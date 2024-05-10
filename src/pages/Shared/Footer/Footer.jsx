import logo from '../../../assets/logo.png';
import { LiaFacebookF } from "react-icons/lia";
import { FaApple, FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
           <footer className="footer p-10 bg-gradient-to-r from-sky-100 to-stone-100 text-base-content">
                <aside>
                <img className= 'w-36 md:w-40 '  src={logo}></img>
                    <p>Wynn and Encore Las Vegas3131 Las Vegas Blvd.<br></br> Las Vegas, NV 89109
                    +1 (702) 770-7000</p>
                    <p>Connect with us.</p>
                    <div className='flex gap-2'>
                        <a href='https://www.facebook.com/'><LiaFacebookF className='text-2xl'></LiaFacebookF></a>
                        <a href='https://www.apple.com/'><FaApple className='text-2xl'></FaApple></a>
                        <a href='https://www.instagram.com/'><FaInstagram className='text-2xl'></FaInstagram></a>
                        <a href='https://twitter.com/'><FaXTwitter className='text-2xl'></FaXTwitter></a>
                    </div>
                </aside> 
                <nav>
                    <h6 className="footer-title">Shop Home Collection</h6> 
                    <a className="link link-hover">Gift Cards</a>
                    <a className="link link-hover">Wynn Stories</a>
                    <a className="link link-hover">Wynn Slots App</a>
                    <a className="link link-hover">Mobile App</a>
                </nav> 
                <nav>
                    <h6 className="footer-title">About Us</h6> 
                    <a className="link link-hover">Investor Relations</a>
                    <a className="link link-hover">Cookie Notice</a>
                    <a className="link link-hover">Terms of Use</a>
                    <a className="link link-hover">Hotel Information & Directory</a>
                </nav> 
                <nav>
                    <h6 className="footer-title">Wynn Palace Cotai</h6> 
                    <a className="link link-hover">Encore Boston Harbor</a>
                    <a className="link link-hover">Wynn Macau</a>
                </nav>
            </footer>
            <footer className="footer footer-center p-4  bg-gradient-to-r from-sky-100 to-stone-100 text-base-content">
                    <aside>
                        <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
                    </aside>
            </footer>
        </div>
    );
};

export default Footer;