import React from "react";

const ServicesCard = ({service}) => {
   const {id, title, icons, description} = service; 
   return (
      <div className="card  bg-base-100 shadow-xl w-full ">
         <figure className="px-10 pt-10">
            <img
               src={icons}
               alt={title}
               className="rounded-xl"
            />
         </figure>
         <div className="card-body items-center text-center">
            <h2 className="card-title capitalize">{title}</h2>
            <p>{description}</p>
         </div>
      </div>
   );
};

export default ServicesCard;
