import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import axios from 'axios'
import Register from './components/Register'
import Profile from './components/Profile'
import UrlHistory from './components/UrlHistory'
import ResetPassword from './components/ResetPassword'
import ForgotPassword from './components/ForgotPassword'
import PublicRoute from './components/PublicRoute'
import ProtectRoute from './components/protectRoute'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [logged, setislogged] = useState(false)
  const [loading, setIsLoading] = useState(true)
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        await axios.get("/verifytokens", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setislogged(true);

      } catch (error) {
        localStorage.removeItem("token")
        setislogged(false)
      } finally {
        console.log("Verification finished")
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home logged={logged} setislogged={setislogged} />
    },
    {
      path: "/login",
      element: (
        <PublicRoute logged={logged}>
          <Login logged={logged} setislogged={setislogged} />
        </PublicRoute>
      )
    },
    {
      path: "/register",
      element: (<PublicRoute logged={logged}>
        <Register logged={logged} setislogged={setislogged} />
      </PublicRoute>)
    },
    {
      path: "/profile",
      element: (<ProtectRoute logged={logged}>
        <Profile logged={logged} setislogged={setislogged} />
      </ProtectRoute>)

    },
    {
      path: "/url-history",
      element: (<ProtectRoute logged={logged}>
        <UrlHistory />
      </ProtectRoute>)
    },
    {
      path: "/reset-password/:token",
      element: (<PublicRoute logged={logged}>
        <ResetPassword />
      </PublicRoute>)
    },
    {
      path: "/forgot-password",
      element: (<PublicRoute logged={logged}>
        <ForgotPassword />
      </PublicRoute>)

    }
  ])
  if (loading) {
    return (
      <div className="history-loading">
        <div>
          <h1>Verifying...</h1>
          <p>
            Please wait while for verification
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
     <ToastContainer />
    <RouterProvider router={router} />
    </>
  )
}

export default App