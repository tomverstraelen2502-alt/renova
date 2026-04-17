"use client";

import { useEffect, useState } from "react";

type ToolStatus = "available" | "requested" | "completed";

type Tool = {
  id: string;
  name: string;
  points: number;
  location: string;
  category: string;
  description: string;
  image: string;
  owner: string;
  requestedBy?: string;
  isUserTool?: boolean;
  status: ToolStatus;
};

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentUser, setCurrentUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [locationFilter, setLocationFilter] = useState("all");
const [sortOption, setSortOption] = useState("default");

  const saveTools = (updatedTools: Tool[]) => {
    setTools(updatedTools);
    localStorage.setItem("renova-tools", JSON.stringify(updatedTools));
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this tool?")) return;

    const updatedTools = tools.filter((tool) => tool.id !== id);
    saveTools(updatedTools);
  };

  const handleRequest = (id: string) => {
    const updatedTools = tools.map((tool) =>
      tool.id === id
        ? {
            ...tool,
            status: "requested" as ToolStatus,
            requestedBy: currentUser,
          }
        : tool
    );

    saveTools(updatedTools);
  };

  useEffect(() => {
    const defaultTools: Tool[] = [
      {
        id: "1",
        name: "Drill",
        points: 3,
        location: "Liège",
        category: "Power tool",
        description: "Useful for small renovation tasks.",
        image:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        owner: "Lucien",
        isUserTool: false,
        status: "available",
      },
      {
        id: "2",
        name: "Ladder",
        points: 3,
        location: "Seraing",
        category: "Hand tool",
        description: "Ideal for painting or ceiling work.",
        image:
          "https://images.unsplash.com/photo-1581147036324-c1c5c6b98d4f?auto=format&fit=crop&w=800&q=80",
        owner: "Hugo",
        isUserTool: false,
        status: "available",
      },
      {
        id: "3",
        name: "Concrete mixer",
        points: 10,
        location: "Herstal",
        category: "Heavy equipment",
        description: "Available for bigger renovation projects.",
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
        owner: "Lucien",
        isUserTool: false,
        status: "available",
      },
    ];

    try {
      const storedTools = localStorage.getItem("renova-tools");
const storedUser = localStorage.getItem("renova-current-user");

if (storedTools) {
  const parsedTools = JSON.parse(storedTools).map((tool: Tool) => ({
    ...tool,
    status: tool.status || "available",
  }));
  setTools(parsedTools);
} else {
  setTools([]);
}

if (storedUser) {
  setCurrentUser(storedUser);
} else {
  setCurrentUser("");
}
    } catch (error) {
      console.error("Error reading localStorage:", error);
      localStorage.setItem("renova-tools", JSON.stringify(defaultTools));
      localStorage.setItem("renova-current-user", "");
      setTools(defaultTools);
      setCurrentUser("");
    }
  }, []);

  const availableLocations = Array.from(
  new Set(tools.map((tool) => tool.location))
);

    const filteredTools = tools
  .filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : tool.status === statusFilter;

    const matchesLocation =
      locationFilter === "all"
        ? true
        : tool.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  })
  .sort((a, b) => {
    if (sortOption === "low") {
      return a.points - b.points;
    }

    if (sortOption === "high") {
      return b.points - a.points;
    }

    return 0;
  });

  return (
    <main className="min-h-screen px-8 py-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
              Tools
            </p>
            <h1 className="mt-2 text-4xl font-bold text-green-700">
              Available tools
            </h1>
            
          <div className="mb-8 grid gap-4 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-stone-200 md:grid-cols-4">
  <div>
    <label className="mb-2 block text-sm font-medium text-green-700">
      Search
    </label>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search a tool"
      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-green-700"
    />
  </div>

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

        <p className="mt-3 max-w-2xl text-green-700">
              Browse tools shared by the Renova community and find what you need locally.
            </p>
            <p className="mt-2 text-sm text-stone-300">
              Current user: <span className="font-semibold text-white">{currentUser}</span>
            </p>
          </div>

          <a
            href="/add-tool"
            className="inline-flex rounded-full bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Add a tool
          </a>

        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {filteredTools.map((tool) => ( 
            <div
              key={tool.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-stone-200"
            >
              <img
                src={tool.image}
                alt={tool.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-green-700">
                    {tool.name}
                  </h2>

                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                    {tool.status}
                  </span>
                </div>

               <p className="mt-2 text-stone-700">
  <span className="font-semibold">Owner:</span>{" "}
  <a
    href={`/users/${encodeURIComponent(tool.owner)}`}
    className="font-semibold text-green-700 hover:underline"
  >
    {tool.owner}
  </a>
</p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Category:</span> {tool.category}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Points:</span> {tool.points}
                </p>

                <p className="mt-1 text-stone-700">
                  <span className="font-semibold">Location:</span> {tool.location}
                </p>

               {tool.requestedBy && (
  <p className="mt-1 text-stone-700">
    <span className="font-semibold">Requested by:</span>{" "}
    <a
      href={`/users/${encodeURIComponent(tool.requestedBy)}`}
      className="font-semibold text-green-700 hover:underline"
    >
      {tool.requestedBy}
    </a>
  </p>
)}

                <p className="mt-3 text-stone-600">{tool.description}</p>

                <div className="mt-5 flex flex-col gap-2">
                  {tool.status === "available" && tool.owner !== currentUser && (
                    <button
                      onClick={() => handleRequest(tool.id)}
                      className="rounded-full bg-green-700 px-4 py-2 text-white transition hover:bg-green-800"
                    >
                      Request
                    </button>
                  )}

                  {tool.status === "available" && tool.owner === currentUser && (
                    <div className="rounded-full bg-stone-200 px-4 py-2 text-center text-sm font-semibold text-stone-700">
                      Your tool
                    </div>
                  )}

                  {tool.status === "requested" && (
                    <div className="rounded-full bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-700">
                      Waiting for owner confirmation
                    </div>
                  )}

                  {tool.status === "completed" && (
                    <div className="rounded-full bg-stone-200 px-4 py-2 text-center text-sm font-semibold text-stone-700">
                      Exchange completed
                    </div>
                  )}

                  {tool.isUserTool && tool.owner === currentUser && (
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="rounded-full border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
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