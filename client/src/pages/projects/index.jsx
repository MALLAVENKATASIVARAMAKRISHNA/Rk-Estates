"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/projects/");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPlotStatusCounts = (plots) => {
    const counts = { Available: 0, Booked: 0, Sold: 0 };
    plots.forEach((plot) => {
      if (counts[plot.status] !== undefined) {
        counts[plot.status]++;
      }
    });
    return counts;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const statusCounts = getPlotStatusCounts(project.plots || []);
              return (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-2">{project.location}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Land Size:</span>{" "}
                      {project.land_length} x {project.land_width} ft
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Total Plots:</span>{" "}
                      {project.num_plots}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Plot Status:</p>
                    <div className="flex gap-2 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                        {statusCounts.Available} Available
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                        {statusCounts.Booked} Booked
                      </span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                        {statusCounts.Sold} Sold
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard?project=${project.id}`}
                    className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
