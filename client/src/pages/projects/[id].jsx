"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${id}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPlot = async (plotId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to book a plot");
        return;
      }
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
      fetchProject();
      setSelectedPlot(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const getGridDimensions = (plots) => {
    if (!plots || plots.length === 0) return { rows: 1, cols: 1 };
    const maxRow = Math.max(...plots.map((p) => p.row_index)) + 1;
    const maxCol = Math.max(...plots.map((p) => p.col_index)) + 1;
    return { rows: maxRow, cols: maxCol };
  };

  const getPlotStatusColor = (status) => {
    const colors = {
      Available: "bg-green-500 hover:bg-green-600",
      Booked: "bg-yellow-500 hover:bg-yellow-600",
      Sold: "bg-red-500",
    };
    return colors[status] || "bg-gray-400";
  };

  const getFacingSymbol = (facing) => {
    const symbols = {
      North: "↑",
      South: "↓",
      East: "→",
      West: "←",
    };
    return symbols[facing] || "?";
  };

  const filteredPlots = project?.plots?.filter((plot) => {
    if (filter === "all") return true;
    return plot.status === filter;
  }) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading project...</div>
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

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Project not found</div>
      </div>
    );
  }

  const { rows, cols } = getGridDimensions(project.plots);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/projects"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Back to Projects
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-600 mb-2">{project.location}</p>
          <p className="text-gray-500 mb-4">{project.description}</p>
          <div className="flex gap-4 text-sm">
            <span>Land: {project.land_length} x {project.land_width} ft</span>
            <span>Total Plots: {project.num_plots}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl font-semibold">Interactive Plot Grid</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Available")}
                className={`px-3 py-1 rounded ${filter === "Available" ? "bg-green-600 text-white" : "bg-gray-200"}`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter("Booked")}
                className={`px-3 py-1 rounded ${filter === "Booked" ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
              >
                Booked
              </button>
              <button
                onClick={() => setFilter("Sold")}
                className={`px-3 py-1 rounded ${filter === "Sold" ? "bg-red-600 text-white" : "bg-gray-200"}`}
              >
                Sold
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))`,
                }}
              >
                {Array.from({ length: rows * cols }).map((_, index) => {
                  const row = Math.floor(index / cols);
                  const col = index % cols;
                  const plot = project.plots?.find(
                    (p) => p.row_index === row && p.col_index === col
                  );

                  if (!plot) {
                    return (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded flex items-center justify-center text-gray-300"
                      >
                        -
                      </div>
                    );
                  }

                  const isVisible =
                    filter === "all" || plot.status === filter;

                  return (
                    <div
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`aspect-square ${getPlotStatusColor(plot.status)} rounded cursor-pointer flex flex-col items-center justify-center text-white text-xs transition-transform hover:scale-105 ${
                        !isVisible ? "opacity-30" : ""
                      }`}
                    >
                      <span className="font-bold">{plot.plot_number}</span>
                      <span>{getFacingSymbol(plot.facing)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Sold</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {selectedPlot ? (
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                <h3 className="text-xl font-bold mb-4">Plot #{selectedPlot.plot_number}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span>{selectedPlot.length} x {selectedPlot.width} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span>{selectedPlot.area} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Facing:</span>
                    <span>{selectedPlot.facing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grid Position:</span>
                    <span>Row {selectedPlot.row_index}, Col {selectedPlot.col_index}</span>
                  </div>
                  {selectedPlot.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold">₹{selectedPlot.price.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span
                        className={`font-semibold ${
                          selectedPlot.status === "Available"
                            ? "text-green-600"
                            : selectedPlot.status === "Booked"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedPlot.status}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedPlot.status === "Available" && (
                  <button
                    onClick={() => handleBookPlot(selectedPlot.id)}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Book This Plot
                  </button>
                )}
                <button
                  onClick={() => setSelectedPlot(null)}
                  className="mt-2 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                Click on a plot to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
