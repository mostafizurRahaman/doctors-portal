
import { useQuery } from '@tanstack/react-query';

import React from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';



const AllUsers = () => {
      const {data:allusers=[], isLoading, refetch} = useQuery({
         queryKey: ['allusers'], 
         queryFn: async() => {
            const res = await fetch('http://localhost:5000/users', {
               headers:{
                  authorization: `Bearer ${localStorage.getItem('doctorsPortalToken')}`,
               }
            }); 
            const data = res.json(); 
            return data; 
         }

      })

      if(isLoading){
         return LoadingSpinner; 
      }

      const handleMakeAdmin =(id) => {
         fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'put', 
            headers: {
               'authorization': `Bearer ${localStorage.getItem('doctorsPortalToken')}`
            }
         })
         .then(res => res.json())
         .then(data => {
            if(data.modifiedCount){
               refetch(); 
            }
         })
         .catch(err => console.log(err)); 
      }
   return (
      <div>
          <h3 className='text-2xl font-bold capitalize mt-5 '>All users</h3>
          <div className="overflow-x-auto">
  <table className="table w-full text-center">
    <thead>
      <tr>
        <th>S.I.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
       {
         allusers.map((u, idx) =>  <tr key={u._id} >
            <th>{idx}</th>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u?.role ? <p className='text-primary font-bold capitalize  text-center'>admin </p>: <button onClick={()=>handleMakeAdmin(u._id)} className='font-bold  px-2 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary'>make admin</button>}</td>
            <td><button type='button'  className='font-bold  px-2 py-1 rounded-lg bg-red-500 '>delete</button></td>
          </tr>)
       }
    </tbody> 
  </table>
</div>
      </div>
   );
};

export default AllUsers;