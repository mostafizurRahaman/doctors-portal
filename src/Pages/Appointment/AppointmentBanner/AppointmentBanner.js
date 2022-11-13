import React, { useState } from "react";
import chair from '../../../assets/images/chair.png'; 
import {DayPicker} from 'react-day-picker'; 
const AppointmentBanner = ({setSelectedDate, selectedDate}) => {
      
   return (
      <header  style={{
         background: `linear-gradient(90deg, rgba(0, 0, 0, 0.521), rgba(0, 0, 0, 0.539)), url(${chair}) no-repeat`, 
         backgroundSize: 'cover', 
         backgroundPosition: 'center center', 
        
      }}>
         <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <img
                  src={chair}
                  className=" rounded-lg w-full lg:w-1/2 py-16 block mx-auto" alt="dentist chair"
               />
               <div className="w-full lg:w-1/2  flex items-center justify-center">
                  <DayPicker 
                     className="bg-white p-3 rounded-lg "
                     mode="single"
                     selected={selectedDate}
                     onSelect={setSelectedDate}   

                  ></DayPicker>
               </div>
            </div>
         </div>
        
      </header>
   );
};

export default AppointmentBanner;
