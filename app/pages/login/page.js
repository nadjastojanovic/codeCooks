"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* left screen side login form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12">
        <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Welcome Back 👋</h1> 
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-lg font-medium">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-semibold transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* right screen side: bg image */}
      <div className="w-1/2 h-full">
        <img
          src="https://i.etsystatic.com/5872003/r/il/ae6eff/2042612085/il_fullxfull.2042612085_d1ka.jpg"
          className="object-cover w-full h-full"
        />
      </div>
    </div>

  );
}
