import { set } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useToken from "../../hooks/useToken";
import ForgetPasswordModal from "./ForgetPasswordModal/ForgetPasswordModal";

const Login = () => {
   const [showModal, setShowModal] = useState(false);
   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm();
   const [loginError, setLoginError] = useState("");
   const { LogIn, GoogleLogin } = useContext(AuthContext);
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";
   const navigate = useNavigate();
   const [loginUserEmail, setLoginUserEmail] = useState("");
   const { token } = useToken(loginUserEmail);
   if (token) {
      navigate(from, { replace: true });
   }
   const handleLogin = (data) => {
      setLoginError("");
      const { email, password } = data;
      LogIn(email, password)
         .then((res) => {
            const user = res.user;
            console.log(email);
            setLoginUserEmail(email);
            toast.success("Congratulations, You login successfully.");
         })
         .catch((err) => {
            setLoginError(err.message);
         });
   };

   const handleGoogleLogin = () => {
      GoogleLogin()
         .then((res) => {
            const user = res.user;
            const currentUser = {
               name: user.displayName,
               email: user.email,
            };
            fetch("http://localhost:5000/users", {
               method: "POST",
               headers: {
                  "content-type": "application/json",
               },
               body: JSON.stringify(currentUser),
            })
               .then((res) => res.json())
               .then(data=> {
                  if(data?.acknowledged || data?.alreadyAvailable){
                     setLoginUserEmail(user.email); 
                     toast('Google Login SuccessFully'); 
                  }
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   };

   return (
      <div
         className="min-h-[700px] flex items-center justify-center
      "
      >
         <div className="flex items-center justify-center  flex-col gap-5 w-96 px-7 py-10  border-1 border-black rounded-lg  shadow-lg">
            <div className=" ">
               <h2 className="text-3xl font-bold text-center ">Login </h2>
            </div>
            <form
               className="w-80 flex flex-col gap-5 "
               onSubmit={handleSubmit(handleLogin)}
            >
               <div className="flex flex-col gap-3 w-full">
                  <label className="capitalize font-medium " htmlFor="email">
                     email
                  </label>
                  <input
                     type="email"
                     placeholder="Enter your email"
                     className="input input-bordered  w-full rounded-lg "
                     {...register("email", {
                        required: "must enter email address: ",
                     })}
                  />
                  {errors.email && (
                     <p className="text-red-500 capitalize" role="alert">
                        {errors.email?.message}
                     </p>
                  )}
               </div>
               <div className="flex flex-col gap-3 w-full">
                  <label className="capitalize font-medium " htmlFor="password">
                     password
                  </label>
                  <input
                     type="password"
                     placeholder="Enter your password"
                     className="input input-bordered  w-full rounded-lg "
                     {...register("password", {
                        required: "must enter a password ",
                        minLength: {
                           value: 6,
                           message: "password must be six character or longer",
                        },
                     })}
                  />
                  {errors.password && (
                     <p className="text-red-500 capitalize ">
                        {errors.password.message}
                     </p>
                  )}
                  <label
                     className="capitalize cursor-pointer font-medium -mt-3 ml-1 underline text-primary text-sm "
                     onClick={() => setShowModal(true)}
                     htmlFor="forgetPasswordModal"
                  >
                     forget password
                  </label>
               </div>
               {loginError && (
                  <p className="text-red-500 font-bold text-center ">
                     {loginError}
                  </p>
               )}
               <input
                  className="btn btn-accent w-full text-white font-bold -mb-4"
                  type="submit"
                  value="Login"
               />
               <p>
                  New to doctors portal ?{" "}
                  <Link
                     to="/register"
                     className="text-secondary  underline text-sm"
                  >
                     Create new Account{" "}
                  </Link>
               </p>
            </form>
            <div className="divider">OR</div>
            <button
               className="btn btn-outline w-full  text-accent"
               onClick={handleGoogleLogin}
            >
               CONTINUE WITH GOOGLE
            </button>
         </div>
         {showModal && (
            <ForgetPasswordModal
               setShowModal={setShowModal}
            ></ForgetPasswordModal>
         )}
      </div>
   );
};

export default Login;
