import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"

export default function Signin() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  // const { signin, currentUser } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      // await signin(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      navigate("/profile")
    } catch (error) {
      setError("Failed to signin")
      setLoading(false)
    }
  }

  return (
    <CenteredContainer>
      <div className='w-full max-w-xs'>
        {/* {error && console.log(error)}
        {console.log(currentUser)} */}
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold'>Sign In</h2>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              type='email'
              ref={emailRef}
              required
              placeholder='Email'
            ></input>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              type='password'
              ref={passwordRef}
              required
              placeholder='****************'
            ></input>
          </div>
          <div className='flex items-center justify-between mb-6'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={loading}
              type='submit'
            >
              Signin
            </button>
            <Link
              className='text-md text-green-500 font-bold'
              to='/forgot-password'
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <p>
              Not Registered?
              <Link
                to='/signup'
                className='text-sm text-green-500 font-bold underline'
              >
                {" "}
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </CenteredContainer>
  )
}
