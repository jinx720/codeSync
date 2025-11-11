import { Link } from "react-router-dom";

function Auth() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0b1a] text-[#f1f0f5] px-4">
      <h1 className="text-4xl font-bold mb-8 text-[#a855f7] tracking-wide">
        Welcome to <span className="text-[#ec4899]">CodeSync</span>
      </h1>

      <div className="bg-[#1a152b] p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center gap-5">
        <p className="text-gray-300 text-center mb-2">
          Connect with developers. Build projects together.
        </p>

        <Link
          to="/signup"
          className="w-full text-center bg-[#a855f7] hover:bg-[#ec4899] text-white font-semibold py-2.5 rounded-lg transition"
        >
          Sign Up
        </Link>

        <Link
          to="/login"
          className="w-full text-center bg-[#0d0b1a] border border-[#a855f7] text-[#a855f7] hover:bg-[#a855f7] hover:text-white font-semibold py-2.5 rounded-lg transition"
        >
          Log In
        </Link>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Crafted with 💜 for developers like you.
      </p>
    </div>
  );
}

export default Auth;
