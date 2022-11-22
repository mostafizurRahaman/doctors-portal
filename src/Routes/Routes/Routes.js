import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../../Layout/DashboardLayout"
import Main from "../../Layout/Main"
import Appointment from "../../Pages/Appointment/Appointment/Appointment"
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor"
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers"
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors"
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment"
import Payment from "../../Pages/Dashboard/Payment/Payment"
import Home from "../../Pages/Home/Home/Home"
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register"
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError"
import AdminRoute from "../AdminRoute/AdminRoute"
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
      element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
      errorElement: <DisplayError></DisplayError>, // here is the error . 
      children: [
         {
            path: '/dashboard', 
            element:<MyAppointment></MyAppointment> 
         }, 
         {
            path: '/dashboard/allusers', 
            element:<AdminRoute>  <AllUsers></AllUsers></AdminRoute>
         }, 
         {
            path: '/dashboard/adddoctors', 
            element: <AdminRoute> <AddDoctor></AddDoctor></AdminRoute> 
         }, 
         {
            path: '/dashboard/manage-doctors', 
            element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
         }, 
         {
            path: "/dashboard/payment/:id", 
            element: <AdminRoute><Payment></Payment></AdminRoute>, 
            loader:async({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)
         }
      ]
   }
])