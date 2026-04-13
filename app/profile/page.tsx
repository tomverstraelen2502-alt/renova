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

export default function ProfilePage() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("renova-current-user-data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <main className="mx-auto min-h-screen max-w-4xl px-8 py-16">
        <div className="rounded-[24px] bg-white p-8 text-stone-900">
          <h1 className="text-3xl font-bold text-green-700">Profile</h1>
          <p className="mt-4">No user is currently logged in.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.photo}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover"
          />

          <h1 className="mt-4 text-4xl font-bold text-green-700">
            {user.name}
          </h1>

          <p className="mt-2 text-stone-700">{user.role}</p>
          <p className="mt-1 text-stone-500">{user.city}</p>
          <p className="mt-4 rounded-full bg-green-700 px-4 py-2 text-white">
            {user.points} points
          </p>
          <a
  href="/edit-profile"
  className="mt-6 inline-flex rounded-full border border-green-700 px-5 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
>
  Edit profile
</a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Account info</h2>
            <p className="mt-4 text-stone-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="mt-2 text-stone-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mt-2 text-stone-700">
              <span className="font-semibold">City:</span> {user.city}
            </p>
          </div>

          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Activity</h2>
            <p className="mt-4 text-stone-700">
              Reviews, requests and exchanges will appear here later.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}