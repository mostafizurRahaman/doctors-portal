import React, { useContext } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const DisplayError = () => {
   const {logOut }  = useContext(AuthContext); 
   const error = useRouteError(); 
   console.log(error); 
   return (
      <div className='flex min-h-screen w-full items-center justify-center  flex-col gap-5 '>
         <h2 className='text-3xl text-red-500 text-center '>Something went wrong</h2>
         <p className="text-xl font-semibold text-center">{error.statusText || error.message}</p>
         <h4 className='font-semibold text-center' > <button onClick={()=> logOut()} className='btn btn-error btn-sm '>LogOut</button> and <Link to='/login'>Log Back In </Link></h4>
      </div>
   );
};

export default DisplayError; 