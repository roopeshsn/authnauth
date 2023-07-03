import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/auth/Signup"
import Signin from "./components/auth/Signin"
import ForgotPassword from "./components/auth/ForgotPassword"
import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import PrivateRoutes from "./components/auth/PrivateRoutes"
import PersistLogin from "./components/auth/PersistLogin"
import NotFound from "./components/NotFound"

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/signin" element={<Signin />}></Route>
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    ></Route>
                    <Route element={<PersistLogin/>}>
                        <Route element={<PrivateRoutes/>}>
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
