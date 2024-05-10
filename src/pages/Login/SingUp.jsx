import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye  } from "react-icons/fa";
import img2 from '../../assets/bag/sinup img.jpg';
import "./login.css";


const SingUp = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="hero min-h-screen log-contain bg-base-200 flex flex-col md:flex-row justify-center">
            <div>
                    <img className='w-4/5 rounded-xl ' src={img2}></img>
                </div>
                <div className="hero-content flex-col ">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-gradient-to-r from-sky-200 to-blue-500 px-12">
                    <form className="card-body">
                        <div className="form-control">
                          <h1 className="text-3xl font-bold text-center">Sing Up</h1>
                          <label className="label">
                               <span className="label-text">Full Name</span>
                           </label>
                             <input type="text" placeholder="Full Name" className="input input-bordered" required />

                        </div>
                             <div className="form-control">
                                 <div className="text-center ">
                                  </div>
                                       <label className="label">
                                        <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" className="input input-bordered" required />
                                        
                             </div>

                                   <div className="form-control">
                                       <label className="label">
                                        <span className="label-text">Image Url</span>
                                       </label>
                                       <input type="text" placeholder="image url" className="input input-bordered" required /> 

                                    </div>

                                <div className="form-control">
                                    <label className="label">
                                    <span className="label-text">Password</span>
                                    </label>
                                   <div className="relative">
                                       <input type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" required />
                                       <span className="absolute top-4 right-3" onClick={()=> setShowPassword(!showPassword)}>
                                        {
                                        showPassword ? <FaEye></FaEye> :  <FaEyeSlash></FaEyeSlash>
                                        }</span>
                                        
                                   </div>
                

                                </div>
                                    <div className="form-control mt-6">
                                      <button className="btn btn-primary">Sing Up</button>
                                    </div>
                                         <label>
                                            Have an account? {""}
                                            <Link to ="/login" className="lebel-text-alt link link-hover ">
                                            <span className="text-blue-800">Please Login</span>
                                            </Link>
                                        </label>            
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SingUp;