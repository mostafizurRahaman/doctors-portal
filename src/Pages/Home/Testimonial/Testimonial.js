import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'; 
import people2 from '../../../assets/images/people2.png'; 
import people3 from '../../../assets/images/people3.png'; 
import Review from './Review';
const Testimonial = () => {

   const reviews = [
      {
         _id:1, 
         name: 'Winson Herry', 
         review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content', 
         image: people1, 
         location: 'california', 
      }, 
      {
         _id:2, 
         name: 'Winson Herry', 
         review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content', 
         image: people2, 
         location: 'california', 
      }, 
      {
         _id:3, 
         name: 'Winson Herry', 
         review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content', 
         image: people3, 
         location: 'california', 
      }

   ]
   return (
      <section className='px-12'>
            <div>
               <div className='flex gap-3 items-center justify-between '>
                  <div className=''>
                     <h4 className='text-xl text-primary  font-bold  capitalize'>Testimonial</h4>
                     <h2 className='text-4xl '>What Our Patients Says</h2>
                  </div>
                  <img src={quote} className="w-24 md:w-48 h-24  md:h-48" alt="blockquote" />
               </div>
               <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12 '>
                   {
                     reviews.map(review => <Review key={review._id} review={review}></Review>)
                   }
               </div>

            </div>
      </section>
   );
};

export default Testimonial;