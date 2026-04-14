"use client";

import { useEffect, useState } from "react";

type ServiceStatus = "available" | "requested" | "completed";

type Service = {
  id: string;
  name: string;
  duration: string;
  points: number;
  location: string;
  description: string;
  image: string;
  owner: string;
  requestedBy?: string;
  isUserService?: boolean;
  status: ServiceStatus;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentUser, setCurrentUser] = useState("Tom");
  const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [locationFilter, setLocationFilter] = useState("all");
const [sortOption, setSortOption] = useState("default");

  const saveServices = (updatedServices: Service[]) => {
    setServices(updatedServices);
    localStorage.setItem("renova-services", JSON.stringify(updatedServices));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
  };

  const handleRequest = (id: string) => {
    const updated = services.map((s) =>
      s.id === id
        ? { ...s, status: "requested" as ServiceStatus, requestedBy: currentUser }
        : s
    );

    saveServices(updated);
  };

  useEffect(() => {
    const defaultServices: Service[] = [
      {
        id: "1",
        name: "Painting help",
        duration: "3 hours",
        points: 5,
        location: "Liège",
        description: "Help with painting walls or ceilings.",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
        owner: "Lucien",
        status: "available",
      },
      {
        id: "2",
        name: "Furniture assembly",
        duration: "2 hours",
        points: 4,
        location: "Ans",
        description: "Assembly of IKEA or other furniture.",
        image:
          "https://images.unsplash.com/photo-1581091012184-5c9c3d8c4f5f?auto=format&fit=crop&w=800&q=80",
        owner: "Hugo",
        status: "available",
      },
    ];

    try {
      const stored = localStorage.getItem("renova-services");
      const storedUser = localStorage.getItem("renova-current-user");

      if (stored) {
        const parsed = JSON.parse(stored).map((s: Service) => ({
          ...s,
          status: s.status || "available",
        }));
        setServices(parsed);
      } else {
        localStorage.setItem("renova-services", JSON.stringify(defaultServices));
        setServices(defaultServices);
      }

      if (storedUser) {
        setCurrentUser(storedUser);
      } else {
        localStorage.setItem("renova-current-user", "Tom");
        setCurrentUser("Tom");
      }
    } catch (error) {
      console.error(error);
      localStorage.setItem("renova-services", JSON.stringify(defaultServices));
      setServices(defaultServices);
      setCurrentUser("Tom");
    }
  }, []);

  const availableLocations = Array.from(
  new Set(services.map((service) => service.location))
);

const filteredServices = services.filter((service) => {
  const matchesSearch = service.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" ? true : service.status === statusFilter;

  const matchesLocation =
    locationFilter === "all"
      ? true
      : service.location === locationFilter;

  return matchesSearch && matchesStatus && matchesLocation;
});

  return (
    <main className="min-h-screen px-8 py-12">
      <section className="mx-auto max-w-6xl">
       <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                 <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
              Services
            </p>
            <h1 className="mt-2 text-4xl font-bold text-green-700">
              Available services
            </h1>

                 <div className="mb-8 grid gap-4 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-stone-200 md:grid-cols-4">

  {/* SEARCH */}
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Search
    </label>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search a service"
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
    />
  </div>

  {/* STATUS */}
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Status
    </label>
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
    >
      <option value="all">All</option>
      <option value="available">Available</option>
      <option value="requested">Requested</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  {/* LOCATION */}
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Location
    </label>
    <select
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
    >
      <option value="all">All locations</option>
      {availableLocations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  </div>

  {/* SORT */}
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Sort by
    </label>
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900"
    >
      <option value="default">Default</option>
      <option value="low">Points: low to high</option>
      <option value="high">Points: high to low</option>
    </select>
  </div>

</div>

            <p className="mt-3 text-green-700">
              Exchange skills and help others in renovation projects.
            </p>
          </div>

         <a
            href="/add-service"
            className="inline-flex rounded-full bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
            >
            Add a service
            </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-[24px] bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden"
            >
              <img
                src={service.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-700">
                  {service.name}
                </h2>

                <p className="mt-2 text-stone-700">
                  Owner:{" "}
                  <a
                    href={`/users/${service.owner}`}
                    className="text-green-700 font-semibold hover:underline"
                  >
                    {service.owner}
                  </a>
                </p>

                <p className="text-stone-700">Duration: {service.duration}</p>
                <p className="text-stone-700">Points: {service.points}</p>
                <p className="text-stone-700">Location: {service.location}</p>

                {service.requestedBy && (
                  <p className="text-stone-700">
                    Requested by:{" "}
                    <a
                      href={`/users/${service.requestedBy}`}
                      className="text-green-700 font-semibold hover:underline"
                    >
                      {service.requestedBy}
                    </a>
                  </p>
                )}

                <p className="mt-3 text-stone-600">{service.description}</p>

                <div className="mt-4 flex flex-col gap-2">
                  {service.status === "available" &&
                    service.owner !== currentUser && (
                      <button
                        onClick={() => handleRequest(service.id)}
                        className="rounded-full bg-green-700 px-4 py-2 text-white"
                      >
                        Request
                      </button>
                    )}

                  {service.owner === currentUser && (
                    <div className="text-sm text-stone-500">
                      Your service
                    </div>
                  )}

                  {service.isUserService && service.owner === currentUser && (
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500 border border-red-500 rounded-full px-4 py-2 hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}