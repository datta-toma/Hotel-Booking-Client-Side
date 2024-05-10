import img1 from '../../assets/bag/login img.jpg';
import "./login.css";

const Login = () => {



    return (
        <div>
            <div className="hero min-h-screen log-contain bg-base-200 flex flex-col md:flex-row justify-center">
                <div>
                    <img className='w-4/5 rounded-xl ' src={img1}></img>
                </div>
                <div className="hero-content">
                     
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  bg-gradient-to-r from-sky-200 to-blue-500 p-12">

                    <form  className="card-body">
                        <div className="form-control">
                             <h1 className="text-3xl font-bold text-center">Login</h1>
                            <label className="label">
                                 <span className="label-text">Email</span>
                            </label>
                               <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required/>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
                        {/* <label>
                            Please here? <Link to="/sign-up" className="label-text-alt link link-hover ">
                              <span className='text-blue-800 ml-2'>Sign Up</span>
                            </Link>
                        </label> */}
                    </form>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;