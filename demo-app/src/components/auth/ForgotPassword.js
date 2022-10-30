import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"

export default function ForgotPassword() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const emailRef = useRef()
  // const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setMessage("")
    try {
      setLoading(true)
      // await resetPassword(emailRef.current.value)
      setLoading(false)
      setMessage("Check your inbox to reset your password")
    } catch (error) {
      setError("Failed to Reset Password")
      setLoading(false)
    }
  }

  return (
    <CenteredContainer>
      <div className="w-full max-w-xs">
        {error && console.log(error)}
        {message && console.log(message)}

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-medium">Reset Password</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
              type="email"
              ref={emailRef}
              required
              placeholder="Email"
            ></input>
          </div>
          <div className="mb-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </CenteredContainer>
  )
}
