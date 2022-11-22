import React, { useEffect, useState, useSyncExternalStore } from "react";
import LaodingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = ({booking}) => {
   const [CardError, setCardError] = useState("");
   const [success, setSuccess] = useState(''); 
   const [processing, setProcessing] = useState(false);  
   const [transaction , setTransaction] = useState(''); 
   const [clientSecret, setClientSecret] = useState("");

   const stripe = useStripe();
   const elements = useElements();
   const {price, patient, email, _id} = booking; 
   
   
  useEffect(()=>{
    fetch('http://localhost:5000/create-payment-intent',{
      method: 'POST', 
      headers: {
        'content-type': 'application/json', 
          authorization: `bearer ${localStorage.getItem("doctorsPortalToken")}`
      }, 
      body: JSON.stringify({price}), 
    })
    .then(res =>res.json())
    .then(data => setClientSecret(data.clientSecret))
    .catch(err => console.log(err))
  }, [price]); 

   const handleSubmit = async (event) => {
      event.preventDefault();
      setSuccess(''); 
      setCardError(''); 
      setTransaction(''); 


      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
         return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         console.log(error);
         setCardError(error.message);
      } else {
         setCardError("");
      }
      setProcessing(true); 
      const {paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
         clientSecret,
         {
           payment_method: {
             card: card,
             billing_details: {
               name: patient, 
               email: email, 
             },
           },
         },
       );

       if(confirmError){
         setCardError(confirmError.message); 
         return ; 
       }

       if(paymentIntent.status === 'succeeded'){
                const payment = {
               name: patient, 
               transaction: paymentIntent.id, 
               email: email, 
               bookingId:_id , 
            }
            fetch('http://localhost:5000/payments',{
               method: "POST" ,
               headers: {
                     'content-type': 'application/json' ,
                     authorization :  `bearer ${localStorage.getItem('doctorsPortalToken')}`, 
               },
               body: JSON.stringify(payment), 
            })
            .then(res =>res.json())
            .then(data => {
               if(data.acknowledged){
                  setSuccess('Congratulations, You payment is completed'); 
                  setTransaction(paymentIntent.id); 
                  console.log(paymentIntent); 
                  console.log(data); 
               }
            })
            .catch(err => console.log(err)); 
       }

       setProcessing(false); 
   };

   
 



   return (
      <>
         <form onSubmit={handleSubmit}>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                           color: "#aab7c4",
                        },
                     },
                     invalid: {
                        color: "#9e2146",
                     },
                  },
               }}
            />
            <button
               className="btn btn-primary btn-sm my-5"
               type="submit"
               disabled={!stripe || !clientSecret ||  processing || booking?.paid }
            >
               {
                  booking?.paid ? 'Paid' : 'pay'
               }
            </button>
         </form>
         <p className="text-red-500 font-bold ">{CardError}</p>
         {
            success && <div>
               <h2 className="text-3xl text-success capitalize ">{success}</h2>
               <p>Transaction_id: {transaction}</p>
            </div>
         }
         {
            processing && <LaodingSpinner></LaodingSpinner>
         }
      </>
   );
};

export default CheckOutForm;
