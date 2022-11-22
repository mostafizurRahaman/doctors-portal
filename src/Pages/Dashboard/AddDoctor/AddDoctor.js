import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AddDoctor = () => {
   const {logOut} = useContext(AuthContext); 
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const { data: specialties = [], isLoading } = useQuery({
      queryKey: ["specialties"],
      queryFn: async () => {
         const res = await fetch("http://localhost:5000/appointmentSpecialty", {
            headers: {
               authorization: `Bearer ${localStorage.getItem('doctorsPortalToken')}`,
            }
         });
         const data = await res.json();
         return data;
      },
   });
   const imageHostKey = process.env.REACT_APP_image_key;
   const handleAddDoctor = (data) => {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
         method: "POST",
         body: formData,
      })
         .then((res) => res.json())
         .then((ImageData) => {
            if (ImageData.success) {
               const doctor = {
                  name: data.name,
                  email: data.email,
                  specialty: data.specialty,
                  image: ImageData?.data?.url,
               };
               fetch(`http://localhost:5000/doctors`, {
                  method: "post",
                  headers: {
                     "content-type": "application/json",
                     authorization: `Bearer ${localStorage.getItem(
                        "doctorsPortalToken"
                     )}`,
                  },
                  body: JSON.stringify(doctor),
               })
                  .then((res) =>{ 
                     if(res.status === 401 || res.status=== 403){
                        return logOut(); 
                     }
                     return  res.json()
                  })
                  .then((result) => {
                     if (result.acknowledged) {
                        toast.success(`${doctor.name} is added Successfully`);
                        navigate('/dashboard/manage-doctors')
                     }
                  })
                  .catch((err) => console.log(err));
            }
         })
         .catch((err) => console.log(err));
   };

   if (isLoading) {
      return <LoadingSpinner></LoadingSpinner>;
   }

   return (
      <div className="w-96 ">
         <h3 className="text-2xl font-bold my-3 ">Add Doctors</h3>
         <form
            className="w-80 flex flex-col gap-5"
            onSubmit={handleSubmit(handleAddDoctor)}
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
               <label htmlFor="specialty" className="capitalize font-medium ">
                  Specialty
               </label>
               <select
                  className="select select-bordered w-full"
                  id="specialty"
                  {...register("specialty", {
                     required: "Please must select an treatment",
                  })}
               >
                  {specialties.map((specialty) => (
                     <option key={specialty._id} value={specialty.name}>
                        {specialty.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex flex-col gap-3 w-full ">
               <label className="font-bold capitalize " htmlFor="image">
                  Photo
               </label>
               <input
                  type="file"
                  className="input input-bordered  "
                  {...register("image", { required: "must upload an image" })}
               />
               {errors.img && (
                  <p className="text-red-500 text-center font-medium capitalize">
                     {errors.img.message}
                  </p>
               )}
            </div>
            <input
               className="btn btn-accent w-full text-white font-bold -mb-4"
               type="submit"
               value="Add doctors"
            />
         </form>
      </div>
   );
};

export default AddDoctor;
