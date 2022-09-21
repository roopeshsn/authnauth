import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
import CenteredContainer from "../CenteredContainer"
import FormInput from "./FormInput"

export default function Signin() {
  // const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const emailInput = {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Not a valid email address!",
    label: "Email",
    required: true,
    textColor: "text-red-500",
  }
  const passwordInput = {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    label: "Password",
  }
  const navigate = useNavigate()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   try {
  //     setError("")
  //     setLoading(true)
  //     // await signin(emailRef.current.value, passwordRef.current.value)
  //     setLoading(false)
  //     navigate("/profile")
  //   } catch (error) {
  //     setError("Failed to signin")
  //     setLoading(false)
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault()
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <CenteredContainer>
      <div className='w-full max-w-sm'>
        {/* {error && console.log(error)}
        {console.log(currentUser)} */}
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold'>Sign In</h2>
          </div>
          <FormInput
            key={emailInput.id}
            {...emailInput}
            value={values[emailInput.name]}
            onChange={onChange}
          />
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              {passwordInput.label}
            </label>
            <input
              key={passwordInput.id}
              {...passwordInput}
              className='shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline'
              value={values[passwordInput.name]}
              onChange={onChange}
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
