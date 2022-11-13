import React from "react";

const BookingModal = ({ treatment , date, setTreatment}) => {
   const { name, slots } = treatment;

   const handleSubmit = (e) => {
      e.preventDefault(); 
      const form = e.target; 
      const fullName = form.fullName.value; 
      const email = form.email.value; 
      const phone = form.phone.value; 
      const slot = form.slot.value; 
      const booking = {
         appointmentDate : date, 
         patient: fullName, 
         treatment: name, 
         slot, 
         email, 
         phone, 
      }
      console.log(booking)
      setTreatment(null); 
   
   }
   return (
      <>
         <input type="checkbox" id="booking-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label
                  htmlFor="booking-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
               >
                  ✕
               </label>
               <h3 className="text-2xl font-semibold  text-accent  text-center ">
                  {name}
               </h3>
               <form className="grid grid-cols-1 gap-3  mt-10" onSubmit={handleSubmit}>
                  <input
                     type="text"
                     value={date}
                     className="font-medium  input w-full input-bordered "
                     disabled 
                     name="date"
                  />
                  <select name="slot" className="select select-bordered w-full">
                                       
                     {
                       slots.length > 1 ? slots.map((slot, idx) => <option key={idx} value={slot} >{slot}</option> ) : 
                        <option value="no space available">No space available </option>
                     }
                  </select>
                  <input
                     type="text"
                     placeholder="full name "
                     className="input w-full input-bordered "
                     name="fullName"
                  />
                  <input
                     type="text"
                     placeholder="email"
                     className="input w-full input-bordered"
                     name="email"
                  />
                  <input
                     type="text"
                     placeholder="phone"
                     className="input w-full input-bordered "
                     name="phone"
                  />

                  <input
                     type="submit"
                     value="submit"
                     className="text-primary  input w-full btn btn-accent  "
                  />
               </form>
            </div>
         </div>
      </>
   );
};

export default BookingModal;
