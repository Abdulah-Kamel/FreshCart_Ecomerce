import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartCountext';

export default function Checkout() {
  let { onlinePayment, cartId } = useContext(cartContext);
 async function handleSubmit(values) {
   let { data } = await onlinePayment(cartId, values);
   console.log(data);
   if (data?.status === "success") {
     window.location.href = data.session.url;
   }
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone:''
    },
    onSubmit:handleSubmit
  })
  return (
    <div className="w-50 py-5 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">details :</label>
        <input
          type="text"
          className="form-control"
          value={formik.values.details}
          onChange={formik.handleChange}
          name="details"
          id="details"
        />
        <label htmlFor="phone">Phone :</label>
        <input
          type="tel"
          className="form-control"
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          id="phone"
        />
        <label htmlFor="city">city :</label>
        <input
          type="text"
          className="form-control"
          value={formik.values.city}
          onChange={formik.handleChange}
          name="city"
          id="city"
        />
        <button className='btn bg-main my-3 text-white' type='submit'>Submit</button>
      </form>
    </div>
  );
}
