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

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: User = {
      name: name.trim(),
      email: email.trim(),
      password,
      city: city.trim(),
      role: role.trim(),
      photo: photo.trim() || "",
      points: 10,
    };

    const existingUsers = localStorage.getItem("renova-users");
    const parsedUsers: User[] = existingUsers ? JSON.parse(existingUsers) : [];

    const emailAlreadyExists = parsedUsers.some(
      (user) => user.email === newUser.email
    );

    if (emailAlreadyExists) {
      alert("An account with this email already exists.");
      return;
    }

    const updatedUsers = [...parsedUsers, newUser];

    localStorage.setItem("renova-users", JSON.stringify(updatedUsers));
    localStorage.setItem("renova-current-user", newUser.name);
    localStorage.setItem("renova-current-user-email", newUser.email);
    localStorage.setItem("renova-current-user-data", JSON.stringify(newUser));
    localStorage.setItem("renova-points", String(newUser.points));

    router.push("/dashboard");
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Sign up
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Create your Renova account
        </h1>

        <p className="mt-4 text-green-700">
          Join the platform to share tools, materials and services with the community.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Full name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              City
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Role / description
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Example: DIY enthusiast"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Create account
            </button>

            <a
              href="/login"
              className="rounded-full border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
            >
              Go to login
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}