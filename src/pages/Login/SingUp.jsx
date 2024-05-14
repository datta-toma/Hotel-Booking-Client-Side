import { Link, useLocation, useNavigate  } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { useForm } from "react-hook-form";
import "./login.css";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import img2 from '../../assets/bag/sinup img.jpg';
import { FaEyeSlash, FaEye  } from "react-icons/fa";
import "./login.css";
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Aos from 'aos';
import 'aos/dist/aos.css';


const SingUp = () => {

    const {createUser, loading} = useAuth() || {};
    const [showPassword, setShowPassword] = useState(false);
  
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      const emailPattern = /^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const onSubmit = (data) => {
        const { email, password } = data;
    
        if (!emailPattern.test(email)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
          });
          return;
        }
    
        if (!passwordPattern.test(password)) {
          Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password must have at least 6 characters, one uppercase letter, one number, and one special character.",
          });
          return;
        }
    
        createUser(email, password)
          .then((result) => {
             //   new user has been created
        const createAt = result.user?.metadata?.creationTime;
        const user ={email, createAt: createAt};
        fetch('https://art-and-craft-store-server-eight.vercel.app/user', {
            method:'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                console.log('user added to the database')
            }
            
        })
            Swal.fire({
              icon: "success",
              title: "Account Created",
              text: "Your account has been created successfully.",
            });
    
            navigate(from);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Signup Error",
              text: err.message,
            });
          });
          
      };

      useEffect(() => {
        Aos.init( );
    }, []);

    return (
        <div>
          <Helmet>
            <title>SingUp</title>
          </Helmet>
            <div className="hero min-h-screen log-contain bg-base-200 flex flex-col md:flex-row justify-center">
            <div data-aos="fade-up-right">
                    <img className='w-full rounded-xl' src={img2}></img>
                </div>
                <div className="hero-content flex-col " data-aos="fade-up-left">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-gradient-to-r from-sky-200 to-blue-500 px-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                          <h1 className="text-3xl font-bold text-center">Sing Up</h1>
                          <label className="label">
                               <span className="label-text">Full Name</span>
                           </label>
                             <input type="text" placeholder="Full Name" className="input input-bordered" required  {...register("FullName", { required: true })} />
                             {errors.FullName && <span>This field is required</span>}

                        </div>
                             <div className="form-control">
                                 <div className="text-center ">
                                  </div>
                                       <label className="label">
                                        <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="email" className="input input-bordered" required  {...register("email", { required: true })} />
                                        
                             </div>

                                   <div className="form-control">
                                       <label className="label">
                                        <span className="label-text">Image Url</span>
                                       </label>
                                       <input type="text" placeholder="image url" className="input input-bordered" required   {...register("image")}/>
                                       {errors.image && <span>This field is required</span>}

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
                                   </div>
                

                                </div>
                                    <div className="form-control mt-6">
                                      <button className="btn btn glass">Sing Up</button>
                                    </div>
                                         <label>
                                            Have an account? {""}
                                            <Link to ="/login" className="lebel-text-alt link link-hover ">
                                            <span className="text-blue-800">Please Login</span>
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

export default SingUp;