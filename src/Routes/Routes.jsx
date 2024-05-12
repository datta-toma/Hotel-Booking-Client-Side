import { createBrowserRouter, useParams } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SingUp from "../pages/Login/SingUp";
import AllRoomCard from "../pages/AllRoomCard/AllRoomCard";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Contact from "../pages/Contact/Contact";
import DetailsPage from "../pages/AllRoomCard/DetailsPage";
import About from "../pages/Home/About/About";
import PrivateRouter from "../layout/PrivateRouter";
import MyBookingPage from "../pages/MyBookingPage/MyBookingPage";
import ConfirmPage from "../pages/AllRoomCard/ConfirmPage";

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
        {
          path:'/contact',
          element:<Contact></Contact>
        },
        {
          path:'/details/:id',
          element:<PrivateRouter><DetailsPage></DetailsPage></PrivateRouter>,
          loader:({params}) => fetch(`http://localhost:5000/Rooms/${params.id}`)
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/booking',
          element:<MyBookingPage></MyBookingPage>
        },
        {
          path:'/confirm/:id',
          element:<ConfirmPage></ConfirmPage>
        },
      ]
    },
  ]);

  export default router;