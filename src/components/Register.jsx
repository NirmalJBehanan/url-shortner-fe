import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import '../App.css'

const Register = () => {
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },

    validationSchema: yup.object({
      username: yup
        .string()
        .required('Username is required'),

      email: yup
        .string()
        .email("enter a valid email")
        .required('email is required'),

      password: yup
        .string()
        .required('password is required')
        .min(4, "Password must be at least 4 characters")
        .max(10, "Password must be less than 10 characters")
    }),

    onSubmit: async (values) => {
      setisloading(true)

      try {
        const response = await axios.post("/register", values)

        console.log(response)

        formik.resetForm()

        alert("Registration successful")

        navigate("/login")

      } catch (error) {
        console.log(error.response?.data?.data)

      } finally {
        setisloading(false)
      }
    }
  })

  if (isloading) {
    return (
      <div className="register-loading">
        <h1>Registering...</h1>
        <p>Please wait while your account is being created</p>
      </div>
    )
  }

  return (
    <div className="register-page">

      <div className="register-container">

        <h2>Register</h2>

        <form
          className="register-form"
          onSubmit={formik.handleSubmit}
        >

          {/* Username */}

          <div className="form-group">

            <label>Username:</label>

            {
              formik.touched.username && formik.errors.username ?
                <p className="register-error">
                  {formik.errors.username}
                </p>
                : null
            }

            <input
              type="text"
              placeholder="Enter username"
              {...formik.getFieldProps("username")}
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>Email:</label>

            {
              formik.touched.email && formik.errors.email ?
                <p className="register-error">
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


          {/* Password */}

          <div className="form-group">

            <label>Password:</label>

            {
              formik.touched.password && formik.errors.password ?
                <p className="register-error">
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


          {/* Register Button */}

          <button
            className="register-button"
            type="submit"
          >
            Register
          </button>

        </form>


        {/* Login Button */}

        <button
          className="login-link-button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  )
}

export default Register