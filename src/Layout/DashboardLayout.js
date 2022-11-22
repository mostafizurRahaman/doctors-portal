import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useIsAdmin from "../hooks/useIsAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
   const { user } = useContext(AuthContext);
   const [isAdmin] = useIsAdmin(user?.email);

   return (
      <div>
         <Navbar></Navbar>
         <div className="drawer drawer-mobile z-0">
            <input
               id="dashboard-drawer"
               type="checkbox"
               className="drawer-toggle"
            />
            <div className="drawer-content px-5">
               <Outlet></Outlet>
            </div>
            <div className="drawer-side">
               <label
                  htmlFor="dashboard-drawer"
                  className="drawer-overlay"
               ></label>
               <ul className="menu p-4 w-80 bg-white lg:bg-transparent text-base-content">
                  <li>
                     <Link to="/dashboard">My appointments</Link>{" "}
                  </li>
                  {isAdmin && (
                     <>
                        <li>
                           <Link to="/dashboard/allusers">All Users</Link>{" "}
                        </li>
                        <li>
                           <Link to="/dashboard/adddoctors">Add Doctors</Link>
                        </li>
                        <li>
                           <Link to='/dashboard/manage-doctors'>Manage Doctors</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
