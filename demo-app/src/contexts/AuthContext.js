import React, { useContext, useState } from "react"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(false)

  //   useEffect(() => {
  //     const unsubscribe = () => {
  //       setCurrentUser(user)
  //       setLoading(false)
  //     }

  //     return () => {
  //       unsubscribe()
  //     }
  //   }, [])

  function register(email, password) {
    const formData = { email, password }
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => data)
  }

  const value = {
    currentUser,
    register,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
