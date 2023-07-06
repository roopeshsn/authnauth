import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from "../CenteredContainer"
import FormInput from "./FormInput"
import axios from "../../api/axios"
import Pop from "../Pop"
import useAuth from "../../hooks/useAuth"

const REGISTER_URL = "/register"

export default function Signup() {
  const { setAuth } = useAuth()
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Not a valid email address!",
      label: "Email",
      required: true,
      textColor: "text-red-500",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "We suggest that password should be atleast 8 characters long.",
      label: "Password",
      required: true,
      textColor: "text-yellow-500",
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
      textColor: "text-red-500",
    },
  ]

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email: values.email, password: values.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      if (response?.data) {
        setSuccessMsg("Account Created Successfully")
        navigate("/dashboard")
      }
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No server response")
      } else if (err.response?.status === 409) {
        setErrorMsg("Email already exist")
      } else {
        setErrorMsg("Registration failed")
      }
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <CenteredContainer>
      <div className="w-full max-w-sm">
        <div className="absolute bottom-4 lg:right-4">
          {successMsg && <Pop message={successMsg} status={"success"} />}
          {errorMsg && <Pop message={errorMsg} status={"error"} />}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6 py-2">
            <h2 className="text-2xl text-gray-800 font-bold">Sign Up</h2>
          </div>

          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <div className="mb-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="py-2">
            <p className="text-gray-500">
              Already have an account?
              <Link
                to="/signin"
                className="text-sm text-green-500 font-bold underline"
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
