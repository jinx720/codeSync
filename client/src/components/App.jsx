// src/components/App.jsx (or src/App.jsx)
import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ProfileSetup from "../pages/ProfileSetup.jsx"; // ✅ import this

function App() {
  return (
    <div className="min-h-screen bg-[#0d0b1a] text-[#f1f0f5]">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile-setup" element={<ProfileSetup />} /> {/* ✅ add this */}
      </Routes>
    </div>
  );
}

export default App;
