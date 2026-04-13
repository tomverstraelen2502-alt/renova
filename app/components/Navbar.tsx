"use client";

import { useEffect, useState } from "react";

type CurrentUser = {
  name: string;
  email: string;
  password: string;
  city: string;
  role: string;
  photo: string;
  points: number;
};

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("renova-current-user-data");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("renova-current-user");
    localStorage.removeItem("renova-current-user-data");
    localStorage.removeItem("renova-points");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-700 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/renovalogo.jpg"
            alt="Renova logo"
            className="h-12 w-auto"
          />
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <a
            href="/"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Dashboard
          </a>
          <a
            href="/exchanges"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
            >
            Exchanges
            </a>
          <a
            href="/tools"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Tools
          </a>
          <a
            href="/materials"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Materials
          </a>
          <a
            href="/services"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            Services
          </a>
          <a
            href="/about"
            className="rounded-full border border-green-700 px-4 py-2 text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            About
          </a>
          
        </nav>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <a
              href="/profile"
              className="flex items-center gap-3 rounded-full border border-green-700 px-3 py-2"
            >
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-semibold text-green-700">
                {currentUser.name}
              </span>
            </a>

            <button
              onClick={handleLogout}
              className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full border border-green-700 px-5 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-700 hover:text-white"
            >
              Login
            </a>

            <a
              href="/signup"
              className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              Sign up
            </a>
          </div>
        )}
      </div>
    </header>
  );
}