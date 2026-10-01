import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as yup from "yup"
import '../App.css'
const Login = ({ logged, setislogged }) => {
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik(
    {
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: yup.object({
        email: yup.string().email("enter a valid email").required('email is required'),
        password: yup.string().required('password is required').min("4").max("5")
      }),
      onSubmit: async (values) => {
        setisloading(true)
        try {
          const response = await axios.post("/login", values)
          localStorage.setItem("token", response.data.token)
          console.log(response)
          setislogged(true)
          formik.resetForm()
          toast.success("login successful!")
          navigate("/")

        } catch (error) {
          toast.error(
            error.response?.data?.message || "Login failed"
          )
          setislogged(false)
          console.log(error.response?.data?.message)
        } finally {
          setisloading(false)
        }
      }
    }
  )
  if (isloading) {
    return (
      <div className="login-loading">
        <h1>Verifying...</h1>
        <p>Please wait while for verification</p>
      </div>
    );
  }
  return (
    <>
    <ToastContainer />
    <div className="login-page">

      <div className="login-container">

        <h2>Login</h2>

        <form
          className="login-form"
          onSubmit={formik.handleSubmit}
        >

          <div>

            <label>Email:</label>

            {
              formik.touched.email && formik.errors.email ?
                <p className="login-error">
                  {formik.errors.email}
                </p>
                : null
            }

            <input
              type="email"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
            />

          </div>


          <div>

            <label>Password:</label>

            {
              formik.touched.password && formik.errors.password ?
                <p className="login-error">
                  {formik.errors.password}
                </p>
                : null
            }

            <input
              type="password"
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
            />

          </div>


          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>
          <Link to="/forgot-password"><button className='button-change-password'>Change password</button></Link>

        </form>

      </div>


    </div>
    </>
  )
}

export default Login