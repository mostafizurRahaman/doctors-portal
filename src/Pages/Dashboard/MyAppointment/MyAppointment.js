import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const MyAppointment = () => {
   const { user } = useContext(AuthContext);

   const url = `http://localhost:5000/bookings?email=${user?.email}`;
   const { data:bookings=[], isLoading  } = useQuery({
      queryKey: ["bookings", user?.email],
      queryFn: async () => {
         const res = await fetch(url, {
            headers: {
               "authorization": `Bearer ${localStorage.getItem('doctorsPortalToken')}`
            }        
         });
         const data = await res.json();
         return data;
      },
   });
   
   if(isLoading){
      return <LoadingSpinner></LoadingSpinner>
   }
   console.log(bookings);

   return (
      <div>
         <h3 className="text-2xl capitalize  text-accent font-bold mt-3">
            My appointments{" "}
         </h3>
         <div className="overflow-x-auto">
            <table className="table w-full my-5 ">
               <thead>
                  <tr>
                     <th>S.I.</th>
                     <th>Name</th>
                     <th>Treatment</th>
                     <th>Date</th>
                     <th>Time</th>
                     <th>Payment</th>
                  </tr>
               </thead>
               <tbody>
                  {bookings?.map((book, idx) => (
                     <tr key={book._id}>
                        <th>{idx +1}</th>
                        <td>{book.patient}</td>
                        <td>{book.treatment}</td>
                        <td>{book.appointmentDate}</td>
                        <td>{book.slot}</td>
                        <td>
                           {book.price && !book.paid &&
                              <Link to={`/dashboard/payment/${book._id}`}>
                                  <button className='btn btn-primary'>Pay</button>
                              </Link>
                           }
                           {
                              book.price && book.paid && <p className="text-secondary capitalize overflow-hidden">paid <br /> transaction: {book.transaction_id}</p>
                           }

                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default MyAppointment;
