import { createBrowserRouter } from "react-router-dom"
import Main from "../../Layout/Main"
import Appointment from "../../Pages/Appointment/Appointment/Appointment"
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard"
import Home from "../../Pages/Home/Home/Home"
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register"
import PrivateRoute from "../PrivateRoute/PrivateRoute"




export const routes = createBrowserRouter([
   {
      path: '/', 
      element: <Main></Main>, 
      children: [
         {
            path: '/', 
            element: <Home></Home>
         }, 
         {
            path: '/login', 
            element: <Login></Login>
         }, 
         {
            path: '/register', 
            element: <Register></Register>
         },
         {
            path: '/appointment', 
            element: <Appointment></Appointment>
         }
      ]
   }, 
   {
      path: '/dashboard', 
      element: <PrivateRoute><Dashboard></Dashboard> </PrivateRoute>
   }
])