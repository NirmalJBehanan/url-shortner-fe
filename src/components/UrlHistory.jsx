import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../App.css'

const UrlHistory = () => {

  const [urls, setUrls] = useState([])
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {

    const getUrlHistory = async () => {

      const token = localStorage.getItem("token")

      if (!token) {
        setIsLoading(false)
        return
      }

      try {

        const response = await axios.get("/history", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log(response.data)

        setUrls(response.data.data)

      } catch (error) {

        console.log(error.response?.data?.message)

      } finally {

        setIsLoading(false)

      }
    }

    getUrlHistory()

  }, [])


  if (isloading) {
    return (
      <div className="history-loading">

        <h2>Loading...</h2>

        <p>
          Please wait while your URLs are loading
        </p>

      </div>
    )
  }


  return (
    <div className="history-page">

      <div className="history-container">

        <h2>My URLs</h2>

        <p className="history-subtitle">
          Here are the URLs you have shortened.
        </p>


        {
          urls.length === 0 ? (

            <div className="no-urls">

              <p>
                You have not generated any URLs yet.
              </p>

            </div>

          ) : (

            <div className="url-list">

              {
                urls.map((url) => {

                  const shortUrl =
                    `https://url-shortner-be-recj.onrender.com/api/short/${url.shortCode}`

                  return (

                    <div
                      className="url-card"
                      key={url._id}
                    >

                      {/* Original URL */}

                      <div className="url-item">

                        <strong>
                          Original URL
                        </strong>

                        <p className="original-url">
                          {url.originalUrl}
                        </p>

                      </div>


                      {/* Short Code */}

                      <div className="url-item">

                        <strong>
                          Short Code
                        </strong>

                        <p>
                          {url.shortCode}
                        </p>

                      </div>


                      {/* Short URL */}

                      <div className="url-item">

                        <strong>
                          Short URL
                        </strong>

                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="short-url"
                        >
                          {shortUrl}
                        </a>

                      </div>


                      {/* Copy Button */}

                      <button
                        className="copy-button"
                        onClick={() =>
                          navigator.clipboard.writeText(shortUrl)
                        }
                      >
                        Copy Short URL
                      </button>

                    </div>

                  )

                })
              }

            </div>

          )
        }

      </div>

    </div>
  )
}

export default UrlHistory