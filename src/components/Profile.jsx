import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'

const Profile = ({ logged, setislogged }) => {
  const [user, setUser] = useState(null)
  const [isloading, setisloading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setislogged(false)
        setisloading(false)
        return
      }

      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log(response.data)
        setUser(response.data.data)

      } catch (error) {
        console.log(error.response?.data?.message)

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token")
          setislogged(false)
        }

      } finally {
        setisloading(false)
      }
    }

    getProfile()
  }, [setislogged])

  if (isloading) {
    return (
      <div className="profile-loading">
        <h1>Loading...</h1>
        <p>Please wait while profile is loading</p>
      </div>
    )
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <h2>Profile</h2>

        {user && (
          <div className="profile-card">

            <div className="profile-details">

              <div className="profile-row">
                <strong>Name</strong>
                <span>{user.username}</span>
              </div>

              <div className="profile-row">
                <strong>Email</strong>
                <span>{user.email}</span>
              </div>

              <div className="profile-row">
                <strong>Role</strong>
                <span>{user.role}</span>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default Profile