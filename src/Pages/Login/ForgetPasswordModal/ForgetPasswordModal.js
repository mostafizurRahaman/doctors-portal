import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'; 
const ForgetPasswordModal = ({  setShowModal }) => {
   const {forgetPassword}  = useContext(AuthContext); 
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const handleForget = (data) => {
      const {forgetEmail } = data; 
      forgetPassword(forgetEmail)
      .then(() => {
         Swal.fire(
            'check your email!',
            'We send an email on to your email!',
            'check email'
          )
      })
      .catch(err => console.log(err)); 

      setShowModal(false); 
   };
   return (
      <>
         <input
            type="checkbox"
            id="forgetPasswordModal"
            className="modal-toggle"
         />
         <div className="modal">
            <div className="modal-box relative">
               <label
                  htmlFor="forgetPasswordModal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
               >
                  ✕
               </label>
               <h3 className="font-bold text-xl  capitalize mb-5 text-center ">
                  Reset Password
               </h3>
               <form onSubmit={handleSubmit(handleForget)}>
                  <input
                     type="email"
                     className="px-3 py-2 text-black w-full  border-2 border-black  rounded-lg "
                     placeholder="Enter your email address: "
                     {...register("forgetEmail", {
                        required: "must enter your email ", 
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                           message: "enter valid email "
                        }
                     })}
                  />
                  {errors.forgetEmail && (
                     <p className="text-red-500 font-bold ">{errors.forgetEmail.message }</p>
                  )}
                  <div className="modal-action">
                  <button
                     type="submit"
                     className="bg-gradient-to-r from-primary to-secondary  px-5 text-white rounded-xl  mx-auto hover:bg-opacity-75  font-semibold text-center  py-2"
                  >
                     Submit
                  </button>
               </div>
               </form>
               
            </div>
         </div>
      </>
   );
};

export default ForgetPasswordModal;
