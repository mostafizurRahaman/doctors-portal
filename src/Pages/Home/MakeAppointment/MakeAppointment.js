import React from "react";
import doctor from '../../../assets/images/doctor-small.png'; 
import PrimaryButton from "../../../Component/PrimaryButton/PrimaryButton";
import appointmentbg from '../../../assets/images/appointment.png'; 
const MakeAppointment = () => {
   return (
      <div className="hero my-16  md:my-32 " style={{
         background: `url(${appointmentbg})`, 
         backgroundRepeat: "no-repeat", 
         backgroundSize: 'cover', 
         backgroundPosition: 'center center', 
      }}>
         <div className="hero-content flex-col lg:flex-row  items-center justify-center  " >
            <img
               src={doctor}
               className="w-1/2 -mt-36 -mb-4  rounded-lg hidden md:block " alt=""
            />
            <div className="w-full lg:w-1/2 ">
               <h4 className="text-primary text-xl">Appointment</h4>
               <h1 className="text-4xl font-bold text-white">Make an appointment Today</h1>
               <p className="py-6 text-white text-justify ">
               It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
               </p>
               <PrimaryButton>Appointment</PrimaryButton>
            </div>
         </div>
      </div>
   );
};

export default MakeAppointment;
