import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import '../App.css'

const Home = ({ logged, setislogged }) => {
    const navigate = useNavigate()
    const [shortUrl, setShortUrl] = useState("")
    const [isloading, setIsLoading] = useState(false)
    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token")
        setislogged(false)
        navigate("/")
    }
    // Formik
    const formik = useFormik({
        initialValues: {
            url: ''
        },
        validationSchema: yup.object({
            url: yup
                .string()
                .url("Please enter a valid URL")
                .required("URL is required")
        }),
        onSubmit: async (values) => {
            const token = localStorage.getItem("token")
            if (!token) {
                setislogged(false)
                navigate("/login")
                return
            }
            setIsLoading(true)
            try {
                const response = await axios.post(
                    "/url",
                    {
                        url: values.url
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data)
                setShortUrl(response.data.data)
                formik.resetForm()
            } catch (error) {
                console.log(error.response?.data?.message)
            } finally {
                setIsLoading(false)
            }
        }
    })
    return (
        <div className="home">
            {/*  NAVBAR  */}
            <nav className="navbar-home">
                <div className="navbar-left">
                    <Link to="/" className="logo">
                        Url-Shortner
                    </Link>
                </div>
                <div className="navbar-right">
                    {
                        logged ?
                            <>
                                <Link to="/profile">
                                    <button> Profile</button>
                                </Link>
                                <Link to="/url-history">
                                    <button> URL History </button>
                                </Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                            :
                            <>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                                <Link to="/register">
                                    <button>Register</button>
                                </Link>
                            </>
                    }
                </div>
            </nav>
            {/*MAIN CONTENT  */}
            {
                logged ?
                    (
                        <section className="url-section">
                            <div className="url-container">
                                <h1>URL Shortener</h1>
                                <p>Enter your long URL and create a short URL.</p>
                                {/* URL FORM */}
                                <form className="url-form" onSubmit={formik.handleSubmit}>
                                   
                                    
                                    
                                    <input type="text" placeholder="Enter your URL" {...formik.getFieldProps("url")} />
                                    {
                                        formik.touched.url && formik.errors.url &&
                                        <p className="error"> {formik.errors.url}</p>
                                       
                                    }
                                    <button type="submit" disabled={isloading}>
                                        {
                                            isloading ? "Generating..." : "Generate Short URL"
                                        }
                                    </button>
                                </form>
                                {/*  SHORT URL  */}
                                {
                                    shortUrl &&
                                    <div className="result">
                                        <p> Your Short URL </p>
                                        <div className="result-row">
                                            <a href={shortUrl} target="_blank" rel="noreferrer">
                                                {shortUrl}
                                            </a>
                                            <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </section>)

                    :
                    (
                        <section className="hero">
                            <h1>
                                Shorten Your URLs
                            </h1>
                            <p>Create short and shareable links easily. </p>
                            <p>
                                Login or register to start shortening your URLs.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/login">
                                    <button>
                                        Login
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button>
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </section>
                    )
            }
            {/*  FOOTER */}
            <footer className="footer">
                <p>
                    2026 @Url-Shortner
                </p>
            </footer>

        </div>
    )
}

export default Home