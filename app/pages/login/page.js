"use client";

import { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion"; // animations (new library)

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", { // 1. AUTHENTICATE USER
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) { // 2. REROUTE
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* left side (log in form) */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">
        {/* back to home button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          <ArrowBackIcon fontSize="small" className="mr-1" />
          Back to Home
        </motion.button>

        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
            Welcome Back 👋
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <label className="block mb-1 text-lg font-medium">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1 text-lg font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* display error msg (if auto log in fails for example) */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-semibold transition"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* right side (just an image) */}
      <div className="w-1/2 h-full">
        <img
          src="https://i.etsystatic.com/5872003/r/il/ae6eff/2042612085/il_fullxfull.2042612085_d1ka.jpg"
          className="object-cover w-full h-full"
          alt="Login background"
        />
      </div>
    </div>
  );
}
