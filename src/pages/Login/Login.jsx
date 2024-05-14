import { Link, useLocation, useNavigate  } from 'react-router-dom';
import img1 from '../../assets/bag/login img.jpg';
import useAuth from '../hook/useAuth';
import { useForm } from "react-hook-form";
import "./login.css";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { FaEyeSlash, FaEye  } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Login = () => {

    const {signInUser, loading} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
   
  
     const navigate = useNavigate();
      const location = useLocation();
      console.log(location)
      // const from = location?.state || "/";
  
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm()
        const onSubmit = (data) => {
          const {email, password} = data;
  
            signInUser(email, password)
            .then((result) =>{
              const loggedInUser = result.user;
              console.log(loggedInUser)
              const user ={email};
              // if(result.user){
              //   // navigate(location?.state ? location?.state : '/');
              // }
              // get access token
              axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
              .then(res =>{
                console.log(res.data)
                if(res.data.success){
                   navigate(location?.state ? location?.state : '/');
                }
              })

            })
      
            .catch(error =>{
              console.log(error)
              // get access token
              // Show error message using SweetAlert
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email and password do not match!',
          });
            })
    };
  
    useEffect(() => {
      Aos.init( );
  }, []);


    return (
        <div>
          <Helmet>
            <title>Login</title>
          </Helmet>
            <div className="hero min-h-screen log-contain bg-base-200 flex flex-col md:flex-row justify-center">
                <div  data-aos="fade-up-right">
                    <img className='w-full h-[500px] rounded-xl ' src={img1}></img>
                </div>
                <div className="hero-content" data-aos="fade-up-left">
                     
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  bg-gradient-to-r from-sky-200 to-blue-500 px-7">

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                             <h1 className="text-3xl font-bold text-center">Login</h1>
                            <label className="label">
                                 <span className="label-text">Email</span>
                            </label>
                               <input type="email" placeholder="email" className="input input-bordered" required 
                               {...register("email", { required: true })}
                                />
                                {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                                    <label className="label">
                                    <span className="label-text">Password</span>
                                    </label>
                                   <div className="relative">
                                       <input type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" required {...register("password", { required: true })}/>
                                       <span className="absolute top-4 right-3" onClick={()=> setShowPassword(!showPassword)}>
                                        {
                                        showPassword ? <FaEye></FaEye> :  <FaEyeSlash></FaEyeSlash>
                                        }</span>
                                        {errors.password && <span>This field is required</span>}

                                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                                   </div>
                

                                </div>
                        <div className="form-control mt-2">
                        <button className="btn btn glass p-3">Login</button>
                        </div>
                        <label>
                            Please here? <Link to="/sign-up" className="label-text-alt link link-hover ">
                              <span className='text-blue-800 ml-2'>Sign Up</span>
                            </Link>
                        </label>
                        <SocialLogin></SocialLogin>
                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;