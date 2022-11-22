import React from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'; 
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
const stripePublish =  loadStripe(process.env.REACT_APP_Stripe_Publishable_key); 

const Payment = () => {
   const booking  = useLoaderData(); 
   const {treatment, price, slot , appointmentDate} = booking; 
   const navigation = useNavigation();  
   if(navigation.state === 'loading'){
      return <LoadingSpinner></LoadingSpinner>
   }
   
   console.log(booking); 
   return (
      <div>
         <h2 className='text-2xl font-bold capitalize my-5 text-red-500 '>Payment for {treatment}</h2>
         <p className='text-xl font-semibold '>Please pay <strong>${price}</strong> for your appointment  on {appointmentDate} at {slot}</p>
         <div className='w-96 my-5 '>
             <Elements stripe={stripePublish}>
                  <CheckOutForm booking={booking}></CheckOutForm>
             </Elements>
         </div>
      </div>
   );
};

export default Payment;