import React from "react";
import cavity from "../../../assets/images/cavity.png";
import fluoride from "../../../assets/images/fluoride.png";
import whitening from "../../../assets/images/whitening.png";
import ServicesCard from "../ServicesCard/ServicesCard";
const Services = () => {
   const services = [
      {
         id: 1,
         title: "Fluoride Treatment",
         description: "We provide fluoride treatment for every people.",
         icons: fluoride,
      },
      {
         id: 2,
         title: "Cavity Filling",
         description: "For cavity filling contact with us.",
         icons: cavity,
      },
      {
         id: 3,
         title: "teeth whitening",
         description:
            "Every man must have white teeth. For teeth whitening contact with us. ",
         icons: whitening,
      },
   ];
   return (
      <div className="py-10">
         <h3 className="text-primary text-2xl font-bold capitalize text-center ">
            Our services
         </h3>
         <h2 className="text-3xl  text-accent  capitalize  text-center ">
            service we provide
         </h2>

         <div className="grid grid-cols-1 justify-items-center py-10 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 ">
               {
                  services.map(service => <ServicesCard key={service.id} service={service}></ServicesCard>)
               }
         </div>
      </div>
   );
};

export default Services;
