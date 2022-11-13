import React from 'react';

const InfoCard = ({card}) => {
   
   return (
      <div className={`capitalize text-white  px-5 py-8 flex flex-col lg:flex-row gap-5   items-center justify-center   rounded-xl ${card.bgClass}`}>
            <img src={card.icons} alt="" />
            <div className="text-center">
               <h3 className="text-xl text-center lg:text-start text-white  font-bold mb-3 capitalize">{card.name}</h3>
               <p className="text-base  capitalize font-semibold ">{card.description}</p>
            </div>
         </div>
   );
};

export default InfoCard;