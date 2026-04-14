"use client";

import { useEffect, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  city: string;
  role: string;
  photo: string;
  points: number;
};

type Review = {
  id: string;
  author: string;
  target: string;
  toolName: string;
  score: number;
  comment: string;
};

type Tool = {
  id: string;
  name: string;
  owner: string;
  status: "available" | "requested" | "completed";
};

type Material = {
  id: string;
  name: string;
  owner: string;
  status: "available" | "requested" | "completed";
};

type Service = {
  id: string;
  name: string;
  owner: string;
  status: "available" | "requested" | "completed";
};

export default function UserProfilePage({
  params,
}: {
  params: { name: string };
}) {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const userName = decodeURIComponent(params.name);

  useEffect(() => {
    const storedUsers = localStorage.getItem("renova-users");
    const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = parsedUsers.find(
      (u) => u.name.toLowerCase() === userName.toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
    }

    const storedReviews = localStorage.getItem("renova-reviews");
    const parsedReviews: Review[] = storedReviews ? JSON.parse(storedReviews) : [];
    setReviews(
      parsedReviews.filter(
        (review) => review.target.toLowerCase() === userName.toLowerCase()
      )
    );

    const storedTools = localStorage.getItem("renova-tools");
    const storedMaterials = localStorage.getItem("renova-materials");
    const storedServices = localStorage.getItem("renova-services");

    const parsedTools: Tool[] = storedTools ? JSON.parse(storedTools) : [];
    const parsedMaterials: Material[] = storedMaterials ? JSON.parse(storedMaterials) : [];
    const parsedServices: Service[] = storedServices ? JSON.parse(storedServices) : [];

    setTools(parsedTools.filter((tool) => tool.owner === userName));
    setMaterials(parsedMaterials.filter((material) => material.owner === userName));
    setServices(parsedServices.filter((service) => service.owner === userName));
  }, [userName]);

  const averageScore = useMemo(() => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((sum, review) => sum + review.score, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const completedCount =
    tools.filter((item) => item.status === "completed").length +
    materials.filter((item) => item.status === "completed").length +
    services.filter((item) => item.status === "completed").length;

  const contributionCount = tools.length + materials.length + services.length;

  const badge = useMemo(() => {
    if (contributionCount >= 5 && completedCount >= 2 && reviews.length >= 2) {
      return {
        label: "Trusted user",
        style: "bg-green-700 text-white",
      };
    }

    if (contributionCount >= 2) {
      return {
        label: "Active contributor",
        style: "bg-stone-100 text-stone-800",
      };
    }

    return {
      label: "New member",
      style: "bg-stone-100 text-stone-800",
    };
  }, [contributionCount, completedCount, reviews.length]);

  if (!user) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-8 py-16">
        <div className="rounded-[24px] bg-white p-8 text-stone-900">
          <h1 className="text-3xl font-bold text-green-700">User not found</h1>
          <p className="mt-4">This profile does not exist yet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-8 py-16">
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.photo && user.photo.trim() !== "" ? user.photo : "/neutre.jpg"}
            alt={user.name}
            className="h-28 w-28 rounded-full object-cover"
          />

          <h1 className="mt-4 text-4xl font-bold text-green-700">{user.name}</h1>
          <p className="mt-2 text-stone-700">{user.role}</p>
          <p className="mt-1 text-stone-500">{user.city}</p>

          <div className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold ${badge.style}`}>
            {badge.label}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <div className="rounded-full bg-green-700 px-4 py-2 text-white">
              {user.points} points
            </div>
            <div className="rounded-full bg-stone-100 px-4 py-2 text-stone-800">
              {averageScore ? `${averageScore}/5 rating` : "No reviews yet"}
            </div>
            <div className="rounded-full bg-stone-100 px-4 py-2 text-stone-800">
              {completedCount} completed exchanges
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Profile</h2>
            <p className="mt-4 text-stone-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="mt-2 text-stone-700">
              <span className="font-semibold">City:</span> {user.city}
            </p>
            <p className="mt-2 text-stone-700">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>

          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Feedback</h2>

            {reviews.length === 0 ? (
              <p className="mt-4 text-stone-700">No reviews available yet.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-[16px] bg-white p-4 ring-1 ring-stone-200"
                  >
                    <p className="font-semibold text-green-700">
                      {review.author} — {review.score}/5
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Exchange: {review.toolName}
                    </p>
                    <p className="mt-2 text-stone-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Tools shared</h2>

            {tools.length === 0 ? (
              <p className="mt-4 text-stone-600">No tools shared yet.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {tools.map((tool) => (
                  <p key={tool.id} className="text-stone-700">
                    • {tool.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Materials shared</h2>

            {materials.length === 0 ? (
              <p className="mt-4 text-stone-600">No materials shared yet.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {materials.map((material) => (
                  <p key={material.id} className="text-stone-700">
                    • {material.name}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[20px] bg-stone-50 p-6">
            <h2 className="text-2xl font-bold text-green-700">Services offered</h2>

            {services.length === 0 ? (
              <p className="mt-4 text-stone-600">No services offered yet.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {services.map((service) => (
                  <p key={service.id} className="text-stone-700">
                    • {service.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}