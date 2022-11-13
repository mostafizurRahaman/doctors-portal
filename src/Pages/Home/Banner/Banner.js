import React from "react";
import heroImage from '../../../assets/images/chair.png'; 
import PrimaryButton from "../../../Component/PrimaryButton/PrimaryButton";
import "./Banner.css"; 
const Banner = () => {
   return (
      <div className="hero BannerBg py-24 px-10">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <img
               src={heroImage}
               className="w-full lg:w-1/2 rounded-lg shadow-2xl" alt=""
            />
            <div>
               <h2 className="text-5xl font-bold text-black ">Your New Smile Starts Here</h2>
               <p className="py-6 text-xl ">
                  We provides better dental care for you. So for getting dental treatment follow us. 
               </p>
               <PrimaryButton>Getting Start</PrimaryButton>
            </div>
         </div>
      </div>
   );
};

export default Banner;
