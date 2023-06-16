import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {
  let baseUrl = "https://route-ecommerce-app.vercel.app";
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signup`, values)
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.errors.msg);
      });
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    }
  }

  let validition = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),
    email: Yup.string()
      .required("email is required")
      .email("enter a valid email"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[1052][0-9]{8}$/i, "phone is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{6,}$/i, "password is not valid"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "repassword dose not match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validition,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  return (
    <div className="w-75 mx-auto py-5">
      <h2 className="text-center">Signup Form</h2>
      {error.length > 0 ? (
        <div className="alert alert-danger">{error}</div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          className="form-control my-2"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
        ) : null}
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
        <label htmlFor="repassword">Repassword: </label>
        <input
          type="password"
          className="form-control my-2"
          name="rePassword"
          id="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div className="alert alert-danger">{formik.errors.rePassword}</div>
        ) : null}
        <label htmlFor="phone">Phone: </label>
        <input
          type="text"
          className="form-control my-2"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="alert alert-danger">{formik.errors.phone}</div>
        ) : null}
        <p>
          Got an account ??
          <Link to={"/login"} className="nav-link text-main">
            Login In
        </Link>
        </p>
        <div className="d-flex justify-content-end">
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
        </div>
      </form>
    </div>
  );
}
