import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  let navigate = useNavigate();
  async function reset(values) {
    setLoading(true);
    let { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode",
      values
    ).catch((err) => {
      setLoading(false)
      setErr(err.response.data.message);
    })
    if (data.status === "Success") {
      setLoading(false);
      navigate("/resetpassword");
    }
  }

  let validition = Yup.object({
    resetCode: Yup.string()
      .required("resetCode is required")
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validition,
    onSubmit: (values) => {
      reset(values);
    },
  });

  return (
    <div className="w-75 mx-auto py-5">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode">resetCode: </label>
        <input
          type="text"
          className="form-control my-2"
          name="resetCode"
          id="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {err.length > 0 ? (
          <div className="alert alert-danger">{err}</div>
        ) : null}
        {loading ? (
          <button className="btn bg-main text-white my-2">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            className="btn bg-main text-white my-2"
            type="submit"
          >
            Verify resetCode
          </button>
        )}
      </form>
    </div>
  );
}
