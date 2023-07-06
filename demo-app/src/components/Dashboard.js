import React from "react"
import useAuth from "../hooks/useAuth"

export default function Dashboard() {
  const {signOut} = useAuth()

  const handleLogout = () => {
    console.log("Logging out...")
    signOut()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-6 text-xl">Welcome to the Dashboard!</p>
      <button className="px-4 py-2 bg-black text-white rounded text-sm font-medium mt-4" onClick={handleLogout}>Sign out</button>
    </div>
  )
}
