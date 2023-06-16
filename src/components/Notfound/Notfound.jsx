import React from 'react'
import erorr from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <div className="text-center py-5">
      <img src={erorr} alt="" className='w-50'/>
    </div>
  );
}
