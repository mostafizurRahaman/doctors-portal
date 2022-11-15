import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext); 
  const handleLogout = () => {
    logOut()
    .then(()=>{})
    .catch(err => console.log(err))
  }
   const menuItems = <>
               <li className='btn-ghost rounded-lg '><Link to='/'>Home</Link></li>
               <li className='btn-ghost rounded-lg '><Link to='/about'>about</Link></li>
               <li className='btn-ghost rounded-lg '><Link to='/appointment'>appointments </Link></li>               
               <li className='btn-ghost rounded-lg '><Link to='/contact'>Contact Us</Link></li>
              
              {
                 user?.uid 
                 ?
                 <>
                  <li className='btn-ghost rounded-lg '><Link to='/dashboard'>Dashboard</Link></li>
                     <li className=' rounded-lg md:mr-5 md:mb-0 mb-5'> <button className='btn-ghost rounded-lg ' onClick={handleLogout}>Logout </button></li>
                    <img src={user.photoURL} alt=""  className='w-10 h-10 rounded-full border-2 border-white '/>
                 </> 
                 : 
                 <>
                    <li className='btn-ghost rounded-lg '><Link to='/login'>Login</Link></li>
                 </>
              }
         </>
   return (
      <div className="navbar  bg-orange-600  text-white flex justify-between">
  <div className="navbar-start ">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="font-bold capitalize text-base menu menu-compact bg-black  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          {
            menuItems
          }
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu capitalize  menu-horizontal p-0 text-base font-bold  items-center ">
       {
         menuItems
       }
    </ul>
  </div>
</div>
   );
};

export default Navbar;