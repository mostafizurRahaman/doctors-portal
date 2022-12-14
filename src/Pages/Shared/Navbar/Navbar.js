import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Navbar = () => {
   const { user, logOut } = useContext(AuthContext);
   const handleLogout = () => {
      logOut()
         .then(() => {})
         .catch((err) => console.log(err));
   };
   const menuItems = (
      <>
         <li >
            <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg " to="/">Home</Link>
         </li>
         <li>
            <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg "  to="/about">about us</Link>
         </li>
         <li >
            <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg "  to="/appointment">appointments </Link>
         </li>
         <li>
            <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg "  to="/contact">Contact Us</Link>
         </li>

         {user?.uid ? (
            <>
               <li className="btn-ghost rounded-lg ">
                  <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg "  to="/dashboard">Dashboard</Link>
               </li>
               <li>
                  {" "}
                  <Link
                    className="px-4 py-2 hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-lg " 
                     onClick={handleLogout}
                  >
                     Logout{" "}
                  </Link>
               </li>
               <img
                  src={user.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white "
               />
            </>
         ) : (
            <>
               <li >
                  <Link className="px-4 py-2 hover:bg-gradient-to-r from-primary to-secondary rounded-lg "  to="/login">Login</Link>
               </li>
            </>
         )}
      </>
   );
   return (
      <div className="navbar  bg-orange-600  text-white flex justify-between">
         <div className="navbar-start ">
            <div className="dropdown">
               <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </label>
               <ul
                  tabIndex={0}
                  className="font-bold capitalize text-base menu menu-compact bg-black  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {menuItems}
               </ul>
            </div>
            <Link to="/" className="btn btn-ghost normal-case text-xl">
               Doctors Portal{" "}
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu capitalize  menu-horizontal p-0 text-base font-bold  items-center ">
               {menuItems}
            </ul>
         </div>
         <label
                  htmlFor="dashboard-drawer"
                  tabIndex={2}
                  className="btn btn-ghost lg:hidden"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                     />
                  </svg>
               </label>
      </div>
   );
};

export default Navbar;
