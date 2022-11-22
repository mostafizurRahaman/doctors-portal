import React, { useEffect, useState } from 'react';
import {format} from 'date-fns'; 
import AppointmentOptions from './AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';
import {useQuery} from '@tanstack/react-query'; 
import { async } from '@firebase/util';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
const AvailableAppointments = ({selectedDate}) => {
      // const  [appointmentOptions , setAppointmentOptions] = useState([]); 
      const [treatment, setTreatment] = useState(null); 
      const date = format(selectedDate, 'PP'); 

      const {data:appointmentOptions= [], refetch, isLoading} = useQuery({
         queryKey: ['appointmentOptions', date], 
         queryFn: async() => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`); 
            const data = await res.json(); 
            return data; 
         }
      })

      if(isLoading){
         return <LoadingSpinner></LoadingSpinner>
      }
      
      // useEffect(()=> {
      //     fetch('http://localhost:5000/appointmentOptions')
      //     .then(res => res.json())
      //     .then(data => setAppointmentOptions(data))
      //     .catch(err => console.log(err)); 
      // }, [])

   return (
      <section className='mt-16'>
          <h3 className='text-secondary text-xl font-bold capitalize text-center '>Available appointment on Date: {date} </h3>
          <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 p-12 '>
               {
                  appointmentOptions.map(appointment => <AppointmentOptions key={appointment._id} appointment={appointment} setTreatment={setTreatment} ></AppointmentOptions>)
               }
          </div>
          {
            treatment &&  <BookingModal treatment={treatment} date={date} setTreatment={setTreatment}  refetch={refetch} ></BookingModal>
          }
      </section>
   );
};

export default AvailableAppointments;