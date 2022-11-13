import React from "react";
import exceptional from '../../../assets/images/treatment.png'; 
import PrimaryButton from "../../../Component/PrimaryButton/PrimaryButton";
const Exceptional = () => {
   return (
      <div className="py-10 ">
         <div className="hero ">
            <div className="hero-content flex-col lg:flex-row">
              <div className="w-full lg:w-1/2">
              <img
                  src={exceptional}
                  className=" w- lg:w-[70%] mx-auto rounded-lg shadow-2xl" alt='excepitonal section'
               />
              </div>
               <div className="w-full lg:w-1/2  ">
                  <h1 className="text-5xl font-bold ">Exceptional Dental Care, on Your Terms</h1>
                  <p className="py-6 text-xl ">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
                  </p>
                  <PrimaryButton>Getting Start</PrimaryButton>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Exceptional;
