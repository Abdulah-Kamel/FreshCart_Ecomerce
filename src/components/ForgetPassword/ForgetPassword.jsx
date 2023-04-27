import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [sucess, setSucess] = useState("");
  async function forget(values) {
    setLoading(true);
    let { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords",
      values
    );
    if (data.statusMsg === "success") {
      setSucess(data.message);
      setLoading(false);
      navigate("/resetcode");
    }
  }
  const [loading, setLoading] = useState(false);
  let validition = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validition,
    onSubmit: (values) => {
      forget(values);
    },
  });

  return (
    <div className="w-75 mx-auto py-5 my-5">
      <div className="container py-5 my-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="form-control my-2"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
          {sucess.length > 0 ? (
            <div className="alert alert-success">{sucess}</div>
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
              Send Email
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
