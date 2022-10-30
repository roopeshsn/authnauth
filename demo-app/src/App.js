import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import ForgotPassword from "./components/auth/ForgotPassword"
import Home from "./components/Home"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
