import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  const signOut = () => { 
    setAuth({});
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, signOut, persist, setPersist}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
