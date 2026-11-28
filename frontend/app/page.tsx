
"use client";

import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage(
      "Login service is not connected yet. Please try again later."
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-5">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left Side */}
        <section className="flex flex-col justify-center bg-gradient-to-br from-blue-950 via-blue-800 to-teal-600 p-10 text-white md:p-14">

          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-blue-800">
              +
            </div>

            <h1 className="text-2xl font-bold tracking-wide">
              MediChannel
            </h1>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-200">
            Your Health, Our Priority
          </p>

          <h2 className="mb-6 text-4xl font-bold leading-tight">
            Better Healthcare,
            <br />
            Better Life.
          </h2>

          <p className="max-w-sm text-base leading-7 text-blue-100">
            Welcome to MediChannel. Access your healthcare
            services and manage your medical appointments
            in one convenient place.
          </p>

          <div className="mt-12 border-t border-white/20 pt-6">
            <p className="text-sm text-blue-100">
              Your trusted healthcare channeling platform.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex flex-col justify-center px-7 py-12 sm:px-12 md:px-14">

          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold text-slate-800">
              Welcome Back!
            </h2>

            <p className="text-sm text-slate-500">
              Please sign in to your MediChannel account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setMessage("Please contact the system administrator for password assistance.")
                }
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-800 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-900"
            >
              Sign In
            </button>

            {message && (
              <p
                role="status"
                className="rounded-lg bg-blue-50 p-3 text-center text-sm text-blue-800"
              >
                {message}
              </p>
            )}

          </form>

          <p className="mt-10 text-center text-xs text-slate-400">
            © 2026 MediChannel. All rights reserved.
          </p>

        </section>
      </div>
    </main>
  );
}
