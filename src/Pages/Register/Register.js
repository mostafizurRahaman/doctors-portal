import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useToken from "../../hooks/useToken";
const Register = () => {

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm();
   const [registerError, setRegisterError] = useState("");
   const { createUser, addInfo, GoogleLogin } = useContext(AuthContext); 
   const navigate = useNavigate();
   const [createUserEmail, setCreateUserEmail] = useState(''); 
   const {token } = useToken(createUserEmail); 
   
   if(token){
      navigate('/'); 
   }
 
   const handleSignUp = (data) => {
      const { name, email, password } = data;
      setRegisterError("");
      createUser(email, password)
         .then((res) => {
            const user = res.user;

            addInfo({ displayName: name })
               .then(() => {
                  savedUser(email, name);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => {
            setRegisterError(err.message);
         });
   };

   const handleGoogleLogin = () => {
      GoogleLogin()
         .then((res) => {
            const user = res.user; 
            const currentUser = {
               email: user.email, 
               name: user.displayName, 
            }
            fetch('http://localhost:5000/users', {
               method: "POST", 
               headers: {
                  'content-type': "application/json", 
               }, 
               body: JSON.stringify(currentUser) 
            })
            .then(res => res.json())
            .then(data => {
                  if(data.acknowledged || data.alreadyAvailable){
                     setCreateUserEmail(user.email); 
                     toast.success('Google Login is successful'); 
                  }
            })
            toast.success("congratulations!!! Your Google login is succeeded");
         })
         .catch((err) => console.log(err));
   };

   const savedUser = (email, name) => {
      const user = { email, name };
      fetch("http://localhost:5000/users", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.acknowledged) {              
               setCreateUserEmail(email); 
               toast.success("user registered successfully");
            }
         })
         .catch((err) => console.log(err));
   };


   // const getAccessToken = (email) => {
   //    fetch(`http://localhost:5000/jwt?email=${email}`)
   //    .then(res => res.json())
   //    .then(data => {
   //       if(data.token){
   //          localStorage.setItem('doctorsPortalToken', data.token); 
   //          navigate('/')
   //       }
   //    })
   //    .catch(err => console.log(err)); 
   // }
   return (
      <div
         className="min-h-[700px] flex items-center justify-center
      "
      >
         <div className="flex items-center justify-center  flex-col gap-5 w-96 px-7 py-10  border-1 border-black rounded-lg  shadow-lg">
            <div className=" ">
               <h2 className="text-3xl font-bold text-center ">Sign Up </h2>
            </div>
            <form
               className="w-80 flex flex-col gap-5"
               onSubmit={handleSubmit(handleSignUp)}
            >
               <div className="flex flex-col gap-3 w-full">
                  <label
                     htmlFor="name"
                     className="text-base  capitalize font-medium  "
                  >
                     name{" "}
                  </label>
                  <input
                     type="text"
                     name="firstName"
                     placeholder="Enter your name : "
                     {...register("name", {
                        required: "must enter your name ",
                     })}
                     className="input input-bordered  w-full rounded-lg "
                  />
                  {errors.name && (
                     <p className="text-red-500 text-center font-medium capitalize">
                        {errors.name.message}
                     </p>
                  )}
               </div>
               <div className="flex flex-col gap-3 w-full">
                  <label className="capitalize font-medium " htmlFor="email">
                     email
                  </label>
                  <input
                     type="email"
                     placeholder="Enter your email"
                     className="input input-bordered  w-full rounded-lg "
                     {...register("email", {
                        required: "please enter your email ",
                     })}
                  />
                  {errors.email && (
                     <p className="text-red-500 text-center font-medium capitalize">
                        {errors.email.message}
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
                        required: "please enter a password ",
                        minLength: {
                           value: 6,
                           message: "password must be 6 character long",
                        },
                        pattern: {
                           value: /(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}/,
                           message: "password must be strong",
                        },
                     })}
                  />
                  {errors.password && (
                     <p className="text-red-500 text-center font-medium capitalize">
                        {errors.password.message}
                     </p>
                  )}
               </div>
               {registerError && (
                  <p className="text-red-500 text-center font-bold ">
                     {registerError}
                  </p>
               )}
               <input
                  className="btn btn-accent w-full text-white font-bold -mb-4"
                  type="submit"
                  value="Sign Up"
               />
               <p className="text-center ">
                  Aready have a account ?{" "}
                  <Link
                     to="/login"
                     className="text-secondary  underline text-sm"
                  >
                     login{" "}
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
      </div>
   );
};

export default Register;
