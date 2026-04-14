"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  city: string;
  role: string;
  photo: string;
  points: number;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingUsers = localStorage.getItem("renova-users");
    const parsedUsers: User[] = existingUsers ? JSON.parse(existingUsers) : [];

    const matchedUser = parsedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("renova-current-user", matchedUser.name);
localStorage.setItem("renova-current-user-email", matchedUser.email);
localStorage.setItem("renova-current-user-data", JSON.stringify(matchedUser));
localStorage.setItem("renova-points", String(matchedUser.points));

    router.push("/dashboard");
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Login
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Access your Renova account
        </h1>

        <p className="mt-4 text-green-700">
          Log in to manage your tools, requests and exchanges.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Login
            </button>

            <a
              href="/signup"
              className="rounded-full border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}