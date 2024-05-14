import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import error from '../../assets/bag/error.jpg';
import { Helmet } from "react-helmet-async";


const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className='text-center'>
                <img className='md:w-auto   md:ml-96 mt-12 md:mt-48'  src={error}></img>
                <p className='font-bold'>This is a completely custom 404 error page.<br></br> it seems that page you are looking for on longer exists.</p>
                <Link to="/">
                <button className='mt-12 font-bold btn btn-outline'><IoArrowBack></IoArrowBack>BACK HOMEPAGE</button>
                </Link>
                
            </div>
   </div>
    );
};

export default ErrorPage;