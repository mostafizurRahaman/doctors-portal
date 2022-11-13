import React from "react";

const Review = ({ review }) => {
   const { _id, review: userReview, name, location, image } = review;
   return (
      <div>
         <div className="card shadow-xl">
            <div className="card-body">
               <p className="text-justify ">{userReview}</p>
               <div className="flex items-center gap-5  mt-7">
                  <div className="avatar ">
                     <div className="w-12 h-12  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={image} alt={name} />
                     </div>
                  </div>
                  <div>
                     <h5 className="text-lg font-medium capitalize">{name}</h5>
                     <p className="text-sm font-semibold capitalize">{location}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Review;
