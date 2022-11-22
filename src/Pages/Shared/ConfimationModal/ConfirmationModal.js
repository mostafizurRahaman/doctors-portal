import React from "react";


const ConfirmationModal = ({item,successAction, closeModal , message, title, successButtonName}) => {
  
  
  
   return (
      <>
         <input type="checkbox" id="confirmation_modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">{title}</h3>
               <p className="text-base capitalize text-red-500">{message}</p>
               <div className="modal-action justify-center">
                  <label onClick={()=>successAction(item)} className="btn bg-primary  text-white ">
                    {successButtonName}
                  </label>
                  <label onClick={closeModal}  className="btn  btn-outline btn-error">No</label>
               </div>
            </div>
         </div>
      </>
   );
};

export default ConfirmationModal;
