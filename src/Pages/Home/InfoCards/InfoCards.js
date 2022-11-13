import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "./InfoCard";

const InfoCards = () => {
   const infoCards = [
      {
         id: 1,
         name: "Opening hour",
         description: "we open our office 08.00 am to 10.00 pm.",
         icons: clock,
         bgClass: " bg-gradient-to-l from-primary to-secondary",
      },
      {
         id: 2,
         name: "visit our location",
         description: "Sadar, Lakshmipur, Bangladesh",
         icons: marker,
         bgClass: "bg-accent",
      },
      {
         id: 3,
         name: "Contact us now",
         description: "+000 123 567 09",
         icons: phone,
         bgClass: " bg-gradient-to-l from-primary to-secondary",
      },
   ];
   return <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 md:grid-cols-2">
         {
            infoCards.map(card => <InfoCard key={card.id} card={card}></InfoCard>)
         }         
   </div>;
};

export default InfoCards;
