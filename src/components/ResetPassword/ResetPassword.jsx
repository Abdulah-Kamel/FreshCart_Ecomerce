import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let baseUrl = "https://route-ecommerce-app.vercel.app";
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .put(`${baseUrl}/api/v1/auth/resetPassword`, values)
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
    if (data.token) {
      setLoading(false);
      navigate("/login");
    }
  }

  let validition = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    newPassword: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validition,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <div className="w-75 mx-auto py-5">
      <h2>Reset new password</h2>
      {error.length > 0 ? (
        <div className="alert alert-danger">{error}</div>
      ) : null}
      <div className="container py-5">
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
          <label htmlFor="newPassword">newPassword: </label>
          <input
            type="password"
            className="form-control my-2"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">
              {formik.errors.newPassword}
            </div>
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
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
