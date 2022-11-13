import React, { useEffect, useState } from 'react';
import {format} from 'date-fns'; 
import AppointmentOptions from './AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';
const AvailableAppointments = ({selectedDate}) => {
      const  [appointmentOptions , setAppointmentOptions] = useState([]); 
      const [treatment, setTreatment] = useState(null); 
      const date = format(selectedDate, 'PP'); 
      useEffect(()=> {
          fetch('appointmentOptions.json')
          .then(res => res.json())
          .then(data => setAppointmentOptions(data))
          .catch(err => console.log(err)); 
      }, [])

   return (
      <section className='mt-16'>
          <h3 className='text-secondary text-xl font-bold capitalize text-center '>Available appointment on Date: {date} </h3>
          <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 p-12 '>
               {
                  appointmentOptions.map(appointment => <AppointmentOptions key={appointment._id} appointment={appointment} setTreatment={setTreatment} ></AppointmentOptions>)
               }
          </div>
          {
            treatment &&  <BookingModal treatment={treatment} date={date} setTreatment={setTreatment} ></BookingModal>
          }
      </section>
   );
};

export default AvailableAppointments;