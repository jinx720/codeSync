import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" }); // type = "success" or "error"

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users", form);
      setMessage({ text: "Account created successfully!", type: "success" });

      // Redirect after short delay
      setTimeout(() => {
        navigate(`/profile-setup?id=${res.data.id}`);
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error creating account. Try again.", type: "error" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b1a] text-[#f1f0f5] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a152b] p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-5"
      >
        <h2 className="text-3xl font-semibold text-center text-[#a855f7]">Sign Up</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="p-2.5 rounded-lg bg-[#0d0b1a] border border-gray-700 focus:border-[#a855f7] outline-none"
        />
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

        {message.text && (
          <p
            className={`text-center text-sm font-medium ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#a855f7] hover:bg-[#ec4899] text-white font-semibold py-2.5 rounded-lg transition"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#a855f7] hover:text-[#ec4899]">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
