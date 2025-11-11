import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  try {
    const res = await api.post("/login", form);

    const user = res.data;
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Login successful");
    navigate("/home");
  } catch (err) {
    console.error(err);
    alert("Invalid credentials");
  }
}



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b1a] text-[#f1f0f5] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a152b] p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-5"
      >
        <h2 className="text-3xl font-semibold text-center text-[#a855f7]">Log In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="p-2.5 rounded-lg bg-[#0d0b1a] border border-gray-700 focus:border-[#a855f7] outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="p-2.5 rounded-lg bg-[#0d0b1a] border border-gray-700 focus:border-[#a855f7] outline-none"
        />

        <button
          type="submit"
          className="bg-[#a855f7] hover:bg-[#ec4899] text-white font-semibold py-2.5 rounded-lg transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#a855f7] hover:text-[#ec4899]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
