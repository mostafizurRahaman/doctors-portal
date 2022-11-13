import React from 'react';
import {format} from 'date-fns'; 
const AvailableAppointments = ({selectedDate}) => {
   return (
      <section className='mt-16'>
          <h3 className='text-secondary text-xl font-bold capitalize text-center '>Available appointment on Date: {format(selectedDate, 'PP')}</h3>
      </section>
   );
};

export default AvailableAppointments;