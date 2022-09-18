import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"

export default function Signup() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  // const { signup, currentUser } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      // await signup(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      navigate("/profile")
    } catch (error) {
      setError("Failed to create an account")
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
          <div className='mb-6 py-2'>
            <h2 className='text-2xl text-gray-800 font-bold'>Sign Up</h2>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              placeholder='Email'
              type='email'
              ref={emailRef}
              required
            ></input>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              type='password'
              ref={passwordRef}
              placeholder='******************'
              required
            ></input>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Password Confimation
            </label>
            <input
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              type='password'
              ref={passwordConfirmationRef}
              placeholder='******************'
              required
            ></input>
          </div>
          <div className='mb-3'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={loading}
              type='submit'
            >
              Signup
            </button>
          </div>
          <div className='py-2'>
            <p className='text-gray-500'>
              Already have an account?
              <Link
                to='/signin'
                className='text-sm text-green-500 font-bold underline'
              >
                {" "}
                Signin
              </Link>
            </p>
          </div>
        </form>
      </div>
    </CenteredContainer>
  )
}
