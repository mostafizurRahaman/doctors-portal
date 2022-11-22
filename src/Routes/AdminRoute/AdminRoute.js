import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useIsAdmin from "../../hooks/useIsAdmin";
import LoadingSpinner from "../../Pages/Shared/LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
   const location = useLocation();
   const { user, loading } = useContext(AuthContext);
   const [isAdmin, adminLoading] = useIsAdmin(user?.email);
   if (loading || adminLoading) {
      return <LoadingSpinner></LoadingSpinner>;
   }
   if (user && isAdmin) {
      return children;
   }

   
   return (
      <>
         <Navigate to="/login" state={{ from: location }} replace></Navigate>
      </>
   );
};

export default AdminRoute;
