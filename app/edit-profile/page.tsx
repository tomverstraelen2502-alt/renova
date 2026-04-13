"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
  city: string;
  role: string;
  photo: string;
  points: number;
};

export default function EditProfilePage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("renova-current-user-data");

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setCity(parsedUser.city);
      setRole(parsedUser.role);
      setPhoto(parsedUser.photo);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      city,
      role,
      photo,
    };

    const storedUsers = localStorage.getItem("renova-users");
    const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = parsedUsers.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("renova-users", JSON.stringify(updatedUsers));
    localStorage.setItem("renova-current-user-data", JSON.stringify(updatedUser));

    router.push("/profile");
  };

  if (!currentUser) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
        <div className="rounded-[24px] bg-white p-8 text-stone-900">
          <h1 className="text-3xl font-bold text-green-700">Edit profile</h1>
          <p className="mt-4">No user is currently logged in.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          Edit profile
        </p>

        <h1 className="mt-4 text-4xl font-bold text-green-700">
          Update your profile
        </h1>

        <p className="mt-4 text-green-700">
          Personalize how your Renova profile appears to the community.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              Name
            </label>
            <input
              type="text"
              value={currentUser.name}
              disabled
              className="w-full rounded-xl border border-stone-300 bg-stone-100 px-4 py-3 text-stone-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-green-700">
              City
            </label>
            <input
              type="text"
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Save changes
          </button>
        </form>
      </div>
    </main>
  );
}