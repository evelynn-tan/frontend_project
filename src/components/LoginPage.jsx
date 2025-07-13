import React, { useState } from "react";
import logobps from "../assets/logobps.png";
import login from "../assets/login.jpeg";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAction, error } = useAuth();
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan password harus diisi");
      return;
    }
    try {
      await loginAction(email, password);
      Navigate("/publications");
      onLogin(); // Panggil fungsi onLogin jika ada
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        {/* Logo BPS */}
        <img src={logobps} alt="BPS Logo" className="h-14 mb-4" />
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}
        {/* Login Form */}
        <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow">
          Login
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-white drop-shadow">
           Email
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-4 bg-white/80"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block mb-2 font-semibold text-white drop-shadow">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mb-6 bg-white/80"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-white text-sky-900 font-bold hover:bg-sky-700 hover:text-white transition cursor-pointer"
          >
            Login
          </button>
        </form>
        {/* <p className="mt-6 text-white drop-shadow text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline font-semibold">
            Register
          </Link>
        </p> */}
      </div>
    </div>
  );
}
