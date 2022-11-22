import React from 'react';

const AppointmentOptions = ({appointment, setTreatment}) => {
   const {name , slots, price} = appointment; 
   
   return (
      <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body text-center ">
        <h2 className="text-2xl text-primary  text-center font-semibold ">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "try another day."} </p>
        <p>{slots.length} {slots.length > 1 ? "spaces" : 'space'} available</p>
        <p>pirce : ${price}</p>
        <div className="">
         <label
         disabled={slots.length === 0}
         className='btn btn-primary text-white  bg-gradient-to-r from-primary to-secondary ' htmlFor="booking-modal"
         onClick={()=>setTreatment(appointment)}
         >
            Book Appointment 
         </label>
         
        </div>
      </div>
    </div>
   );
};

export default AppointmentOptions;