import React from "react";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Profile from "./authentication/Profile";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* App routes */}

                    {/* Profile routes */}
                    <Route path="/user" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
                    <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>

                    {/* Authentication routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
