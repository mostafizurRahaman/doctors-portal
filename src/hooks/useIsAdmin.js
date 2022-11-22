import { useEffect, useState } from "react";

const useIsAdmin = (email) => {
   const [isAdmin, setIsAdmin] = useState(false);
   const [adminLoading, setAdminLoading] = useState(true);
   useEffect(() => {
      if (email) {
         fetch(`http://localhost:5000/users/admin/${email}`, {
            headers: {
               authorization: `Bearer ${localStorage.getItem('doctorsPortalToken')}`,
            }
         })
            .then((res) => res.json())
            .then((data) => {
               setIsAdmin(data.isAdmin);
               setAdminLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }, [email]);
   return [isAdmin, adminLoading];
};

export default useIsAdmin;
