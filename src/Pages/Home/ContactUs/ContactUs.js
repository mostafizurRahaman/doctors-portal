import React from "react";
import contactUs from '../../../assets/images/appointment.png'; 
import PrimaryButton from "../../../Component/PrimaryButton/PrimaryButton";
const ContactUs = () => {
   return (
      <div className="flex items-center  justify-center flex-col gap-5 py-20 " style={{
         background: `url(${contactUs}) no-repeat`, 
         backgroundSize: "cover", 
         backgroundPosition: 'center center', 

      }}>
         <div className="text-center ">
            <h5 className="text-xl text-primary ">Contact Us</h5>
            <h2 className="text-4xl  text-white ">Stay connected with us</h2>
         </div>
         <form className="w-4/5  md:w-3/5  lg:w-2/5 flex  flex-col gap-5">
            <div>
               <input
                  type="text"
                  placeholder="Name"
                  className="input w-full "
               />
            </div>
            <div>
               <input
                  type="email"
                  placeholder="Email "
                  className="input w-full "
               />
            </div>
            <textarea className="textarea textarea-bordered text-base" placeholder="Message " name="message"  rows='4'></textarea>
            <div className="flex items-center justify-center">
               <PrimaryButton >Submit Now</PrimaryButton>
            </div>
         </form>
      </div>
   );
};

export default ContactUs;
