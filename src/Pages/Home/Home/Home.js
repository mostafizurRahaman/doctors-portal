import React from 'react';
import Exceptional from '../Exceptional/Exceptional';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Testimonial from '../Testimonial/Testimonial';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
   return (
      <div >
         <Banner></Banner>
         <InfoCards></InfoCards>
         <Services></Services>
         <Exceptional></Exceptional>
         <MakeAppointment></MakeAppointment>
         <Testimonial></Testimonial>
         <ContactUs></ContactUs>
      </div>
   );
};

export default Home;