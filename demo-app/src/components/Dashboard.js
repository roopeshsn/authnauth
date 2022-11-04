import React, { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"

export default function Dashboard() {
  const [email, setEmail] = useState(null)
  const user = useAuth()
  useEffect(() => {
    console.log(user)
    if (user) {
      setEmail(user.auth.email)
    }
  }, [user])

  return (
    <div className="pt-4 pl-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome to the Dashboard {email}!</p>
    </div>
  )
}
