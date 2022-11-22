import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import ConfirmationModal from "../../Shared/ConfimationModal/ConfirmationModal";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ManageDoctors = () => {
   const {user} = useContext(AuthContext);
   const {
      data: doctors = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["doctors"],
      queryFn: async () => {
         try {
            const res = await fetch("http://localhost:5000/doctors", {
               headers: {
                  authorization: `Bearer ${localStorage.getItem('doctorsPortalToken')}`,
               }
            });
            const data = res.json();
            return data;
         } catch (err) {
            console.log(err);
         }
      },
   });
  
   const [item, setItem] =  useState(null); 

   if (isLoading) {
      return <LoadingSpinner></LoadingSpinner>;
   }

   const handleShow = (id) => { 
       fetch(`http://localhost:5000/doctors/${id}`,{
          headers: {
           "authorization": `Bearer ${localStorage.getItem('doctorsPortalToken')}`
          }
       })
       .then(res => res.json())
       .then(data => {
               setItem(data); 

       })
       .catch(err => console.log(err)); 
   }

   const closeModal = () => {
      setItem(null); 
   }

   const handleDelete = (selectedData) => {
      fetch(`http://localhost:5000/doctors/${selectedData._id}`, {
         method: 'delete', 
         headers: {
            "authorization" : `Bearer ${localStorage.getItem('doctorsPortalToken')}`
         }
      })
      .then(res => res.json())
      .then(data => {
         if(data.deletedCount >0 ){
            toast.success(`${selectedData.name} deleted Successfully`); 
            setItem(null); 
            refetch(); 
         }
      })
      .catch(err => console.log(err));
   }

   console.log(doctors);
   return (
      <div>
         <h3 className="text-2xl font-bold capitalize  my-5 ">Manage Doctors</h3>
         <div>
            <div className="overflow-x-auto w-full">
               <div className="overflow-x-auto">
                  <table className="table w-full">
                     <thead>
                        <tr>
                           <th>S.I.</th>
                           <th>Photo</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Specialty</th>
                           <th>action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {doctors.map((doctor, idx) => (
                           <tr key={doctor._id}>
                              <td>
                                 {idx >= 9 && 0} {idx + 1}
                              </td>
                              <td>
                                 <div className="avatar">
                                    <div className="w-12 rounded-full  border-2 border-blue-500">
                                       <img src={doctor.image} alt={doctor.name} className="rounded-full" />
                                    </div>
                                 </div>
                              </td>
                              <td>{doctor.name}</td>
                              <td>{doctor.email}</td>
                              <td>{doctor.specialty}</td>
                              <td  ><label htmlFor="confirmation_modal" onClick={()=> handleShow(doctor._id)} className="btn btn-sm btn-error text-white " >delete</label></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            {
               item && <ConfirmationModal 
                  title="Are your confirm to delete??"
                  message={`If you delete ${item.name} , you cannot recover it.`}
                  successAction={handleDelete}
                  closeModal={closeModal}
                  item={item}
                  successButtonName="Delete"
               ></ConfirmationModal>
            }
         </div>
      </div>
   );
};

export default ManageDoctors;
