import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import "./nav.css";

const Navbar = () => {
    const navItem = <>
     <li><NavLink to='/'>Home</NavLink></li>
     <li><NavLink>Room</NavLink></li>
     <li><NavLink>My Booking</NavLink></li>
     <li><NavLink>About Us</NavLink></li>
     <li><NavLink>Contact Us</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar  Nav-contain bg-base-100 p-4">
                 <div className="navbar-start">
                        <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                        </div>
                        <img className= 'w-28 md:w-36 '  src={logo}></img>
                        <a className="btn btn-ghost text-xl md:text-4xl font-extrabold italic">ENCORE-HOTEL</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                        {navItem}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Login</a>
                    </div>
             </div>
        </div>
    );
};

export default Navbar;