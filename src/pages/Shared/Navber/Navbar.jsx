import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import useAuth from '../../hook/useAuth';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import "./nav.css";

const Navbar = () => {

    const {logout, user} = useAuth()
    console.log(user)

    const handleLogout = () => {
        logout()
          .then(() => {
            toast.success("Successfully logged out");
          })
          .catch((err) => {
            toast.error(`Logout failed: ${err.message}`);
          });
      };

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
                        <a className="btn btn-ghost md:text-4xl font-extrabold italic">ENCORE-HOTEL</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                        {navItem}
                        </ul>
                    </div>
                    <div className="navbar-end">

            {user ? (
              <div className="dropdown dropdown-end">
               <label tabIndex={0} className="btn btn-ghost btn-square" >
               <Tooltip
                  // Don't forget the `.`!
                  anchorSelect=".btn-circle"
                  content={user?.displayName  || user.email}
                />
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || 'https://i.postimg.cc/x1qf83JV/serious-man-formal-jacket-tie-standing-camera-1262-20387.avif'} alt="User Avatar" />
              </div>
            </label>
                {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip  tooltip-left" data-tip={user?.displayName  || user.email}> */}
                
              
                    <button onClick={handleLogout} className="btn  btn-sm btn-glass">
                      <RiLogoutCircleRLine></RiLogoutCircleRLine> Logout 
                    </button>
                  
                
              </div>
            ) : (
              <>
              <Link to="/login">
                <button className="btn btn-sm md:text-xl btn-ghost">Login</button>
              </Link>
            </>
            )}
                    </div>
             </div>
        </div>
    );
};

export default Navbar;