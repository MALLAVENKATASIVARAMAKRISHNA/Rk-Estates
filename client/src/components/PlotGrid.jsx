"use client";

import { useState } from "react";

const PlotGrid = ({ plots, onPlotClick, selectedPlotId }) => {
  const [filter, setFilter] = useState("all");

  const getGridDimensions = (plots) => {
    if (!plots || plots.length === 0) return { rows: 1, cols: 1 };
    const maxRow = Math.max(...plots.map((p) => p.row_index)) + 1;
    const maxCol = Math.max(...plots.map((p) => p.col_index)) + 1;
    return { rows: maxRow, cols: maxCol };
  };

  const getPlotStatusColor = (status) => {
    const colors = {
      Available: "bg-green-500 hover:bg-green-600 cursor-pointer",
      Booked: "bg-yellow-500 hover:bg-yellow-600 cursor-pointer",
      Sold: "bg-red-500 cursor-not-allowed",
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

  const filteredPlots = plots?.filter((plot) => {
    if (filter === "all") return true;
    return plot.status === filter;
  }) || [];

  const { rows, cols } = getGridDimensions(plots);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <h2 className="text-xl font-semibold">Plot Grid</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Available")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "Available" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilter("Booked")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "Booked" ? "bg-yellow-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Booked
          </button>
          <button
            onClick={() => setFilter("Sold")}
            className={`px-3 py-1 rounded text-sm ${
              filter === "Sold" ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Sold
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const plot = plots?.find((p) => p.row_index === row && p.col_index === col);

            if (!plot) {
              return (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded flex items-center justify-center text-gray-400"
                >
                  -
                </div>
              );
            }

            const isVisible = filter === "all" || plot.status === filter;
            const isSelected = selectedPlotId === plot.id;

            return (
              <div
                key={plot.id}
                onClick={() => plot.status !== "Sold" && onPlotClick && onPlotClick(plot)}
                className={`
                  aspect-square rounded flex flex-col items-center justify-center text-white text-xs font-medium
                  transition-transform hover:scale-105
                  ${getPlotStatusColor(plot.status)}
                  ${!isVisible ? "opacity-25" : ""}
                  ${isSelected ? "ring-4 ring-blue-500 ring-offset-2" : ""}
                `}
              >
                <span>{plot.plot_number}</span>
                <span className="text-lg">{getFacingSymbol(plot.facing)}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Available ({plots?.filter(p => p.status === "Available").length || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Booked ({plots?.filter(p => p.status === "Booked").length || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Sold ({plots?.filter(p => p.status === "Sold").length || 0})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotGrid;
