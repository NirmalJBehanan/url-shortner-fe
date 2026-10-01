import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import '../App.css'

const ForgotPassword = () => {

    const [isloading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const formik = useFormik({

        initialValues: {
            email: ''
        },

        validationSchema: yup.object({
            email: yup
                .string()
                .email("Enter a valid email")
                .required("Email is required")
        }),

        onSubmit: async (values) => {

            setIsLoading(true)
            setMessage("")

            try {

                const response = await axios.post(
                    "/forgotPassword",
                    values
                )

                console.log(response.data)

                setMessage(response.data.message)

                formik.resetForm()

            } catch (error) {

                console.log(error.response?.data?.message)

                setMessage(
                    error.response?.data?.message ||
                    "Something went wrong"
                )

            } finally {

                setIsLoading(false)

            }
        }
    })

    return (
        <div className="login-page">

            <div className="login-container">

                <h2>Forgot Password</h2>

                <form
                    className="login-form"
                    onSubmit={formik.handleSubmit}
                >

                    <div>

                        <label>Email:</label>

                        {formik.touched.email &&
                            formik.errors.email && (
                                <p className="login-error">
                                    {formik.errors.email}
                                </p>
                            )}

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                        />

                    </div>

                    <button
                        className="login-button"
                        type="submit"
                        disabled={isloading}
                    >
                        {isloading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                </form>

                {message && (
                    <p style={{
                        marginTop: "15px",
                        textAlign: "center"
                    }}>
                        {message}
                    </p>
                )}

                <div style={{
                    marginTop: "15px",
                    textAlign: "center"
                }}>
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default ForgotPassword