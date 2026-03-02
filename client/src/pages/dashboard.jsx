"use client";

import { useState, useEffect } from "react";

const BuyerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBookPlot = async (plotId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/plots/${plotId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Booked" }),
      });
      if (!response.ok) throw new Error("Failed to book plot");
      alert("Plot booked successfully!");
      fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const getFacingColor = (facing) => {
    const colors = {
      North: "bg-blue-500",
      South: "bg-orange-500",
      East: "bg-green-500",
      West: "bg-yellow-500",
    };
    return colors[facing] || "bg-gray-500";
  };

  const getStatusColor = (status) => {
    const colors = {
      Available: "text-green-600",
      Booked: "text-yellow-600",
      Sold: "text-red-600",
    };
    return colors[status] || "text-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
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
        <h1 className="text-3xl font-bold mb-8">Buyer Dashboard</h1>

        {!selectedProject ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleProjectClick(project)}
                >
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-2">{project.location}</p>
                  <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Land: {project.land_length} x {project.land_width}</span>
                    <span>Plots: {project.num_plots}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedProject(null)}
              className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              ← Back to Projects
            </button>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-2">{selectedProject.name}</h2>
              <p className="text-gray-600 mb-2">{selectedProject.location}</p>
              <p className="text-gray-500">{selectedProject.description}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Available Plots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedProject.plots.map((plot) => (
                <div
                  key={plot.id}
                  className="bg-white p-4 rounded-lg shadow border-l-4 border-gray-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Plot #{plot.plot_number}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getFacingColor(plot.facing)} text-white`}>
                      {plot.facing}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <p>Dimensions: {plot.length} x {plot.width}</p>
                    <p>Area: {plot.area} sq ft</p>
                    <p>Grid Position: Row {plot.row_index}, Col {plot.col_index}</p>
                    {plot.price && <p className="font-semibold">Price: ₹{plot.price.toLocaleString()}</p>}
                  </div>
                  <div className="mt-3">
                    <span className={`font-semibold ${getStatusColor(plot.status)}`}>
                      {plot.status}
                    </span>
                    {plot.status === "Available" && (
                      <button
                        onClick={() => handleBookPlot(plot.id)}
                        className="mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
