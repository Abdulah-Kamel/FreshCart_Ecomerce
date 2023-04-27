import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let baseUrl = "https://route-ecommerce.onrender.com";
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      setLoading(false);
      navigate("/home");
      localStorage.setItem("userToken", data.token);
      saveUserData()
    }
  }

  let validition = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    password: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validition,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <div className="w-75 mx-auto py-5">
      <h2 className="text-center">Login Form</h2>
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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="form-control my-2"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          <Link to={"/forgetpassword"} className="nav-link text-main mt-2">
            Forget password ...?
          </Link>
          <p>
            Dont have an account
            <Link to={"/signup"} className="nav-link text-main">
              Signup Now
            </Link>
          </p>
          <div className="d-flex justify-content-end">
            {loading ? (
              <button className="btn bg-main text-white">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                className="btn bg-main text-white"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
