import React from 'react';

const PrimaryButton = ({children}) => {
   return (
      <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary  text-white font-bold text-base " style={{letterSpacing: "2px"}}>{children}</button>
   );
};

export default PrimaryButton;