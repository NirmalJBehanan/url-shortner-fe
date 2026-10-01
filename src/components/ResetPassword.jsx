import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [isloading, setIsLoading] = useState(false)

    const formik = useFormik({

        initialValues: {
            password: '',
            confirmPassword: ''
        },

        validationSchema: yup.object({

            password: yup
                .string()
                .required("Password is required")
                .min(4, "Password must be at least 4 characters")
                .max(10, "Password must be less than 10 characters"),

            confirmPassword: yup
                .string()
                .required("Please confirm your password")
                .oneOf(
                    [yup.ref("password")],
                    "Passwords do not match"
                )
        }),

        onSubmit: async (values) => {

            setIsLoading(true)
            setMessage("")

            try {

                const response = await axios.put(
                    `/resetPassword/${token}`,
                    {
                        password: values.password
                    }
                    ,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                console.log(response.data)

                setMessage(response.data.message)

                formik.resetForm()

                setTimeout(() => {
                    navigate("/login")
                }, 2000)

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

                <h2>Reset Password</h2>

                <form
                    className="login-form"
                    onSubmit={formik.handleSubmit}
                >

                    <div>

                        <label>New Password</label>

                        {formik.touched.password &&
                            formik.errors.password && (
                                <p className="login-error">
                                    {formik.errors.password}
                                </p>
                            )}

                        <input
                            type="password"
                            placeholder="Enter new password"
                            {...formik.getFieldProps("password")}
                        />

                    </div>


                    <div>

                        <label>Confirm Password</label>

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="login-error">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            {...formik.getFieldProps("confirmPassword")}
                        />

                    </div>


                    <button
                        className="login-button"
                        type="submit"
                        disabled={isloading}
                    >
                        {isloading
                            ? "Changing Password..."
                            : "Change Password"}
                    </button>

                </form>

                {message && (
                    <p style={{ marginTop: "15px", textAlign: "center" }}>
                        {message}
                    </p>
                )}

            </div>

        </div>
    )
}

export default ResetPassword