import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CenteredContainer from "../CenteredContainer"
import FormInput from "./FormInput"
import useAuth from "../../hooks/useAuth"
import axios from "../../api/axios"
import Pop from "../Pop"
const LOGIN_URL = "/auth"

export default function Signin() {
  const { setAuth } = useAuth()
  const [successMsg, setSuccessMsg] = useState("")
  const [errMsg, setErrMsg] = useState("")
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

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: values.email, password: values.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      //const roles = response?.data?.roles;
      setAuth({ email: values.email, password: values.password, accessToken })
      setSuccessMsg("Login success")
      setTimeout(() => {
        navigate("/dashboard")
      }, 3000)
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Wrong username or password")
      } else {
        setErrMsg("Login Failed")
      }
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <CenteredContainer>
      <div className="absolute bottom-4 right-4">
        {successMsg && <Pop message={successMsg} status={"success"} />}
        {errMsg && <Pop message={errMsg} status={"error"} />}
      </div>
      <div className="w-full max-w-sm relative">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Sign In</h2>
          </div>
          <FormInput
            key={emailInput.id}
            {...emailInput}
            value={values[emailInput.name]}
            onChange={onChange}
          />
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {passwordInput.label}
            </label>
            <input
              key={passwordInput.id}
              {...passwordInput}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:shadow-outline"
              value={values[passwordInput.name]}
              onChange={onChange}
            ></input>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
              type="submit"
            >
              Signin
            </button>
            <Link
              className="text-md text-green-500 font-bold"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <p>
              Not Registered?
              <Link
                to="/signup"
                className="text-sm text-green-500 font-bold underline"
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
