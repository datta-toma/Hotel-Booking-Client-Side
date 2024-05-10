import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SingUp from "../pages/Login/SingUp";
import AllRoomCard from "../pages/AllRoomCard/AllRoomCard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/sign-up',
          element:<SingUp></SingUp>
        },
        {
          path:'/room',
          element:<AllRoomCard></AllRoomCard>
        },
      ]
    },
  ]);

  export default router;