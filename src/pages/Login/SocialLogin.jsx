import useAuth from "../hook/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const {googleLogin} = useAuth();

    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

    const handleSocialLogin = socialProvider =>{
        socialProvider()
        .then(result =>{
            if(result.user){
                navigate(from)
            
            }
        })
    }

    return (
        <div>
        <div className="text-center">Continue with</div><hr></hr>
        <div className="text-center mt-3">
        <button onClick={() =>handleSocialLogin(googleLogin)} className="btn glass "><FcGoogle className="text-3xl "></FcGoogle>Google</button>
        </div>
   </div>
    );
};

export default SocialLogin;