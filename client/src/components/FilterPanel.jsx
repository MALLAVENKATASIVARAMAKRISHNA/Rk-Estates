"use client";

import { useState, useEffect } from "react";
import { filterPlots, getPlotFilters } from "../utils/plotFilters";

const FilterPanel = ({ plots, onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "all",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    minLength: "",
    maxLength: "",
    minWidth: "",
    maxWidth: "",
    facing: "all",
  });

  const [filterRanges, setFilterRanges] = useState(null);

  useEffect(() => {
    if (plots) {
      setFilterRanges(getPlotFilters(plots));
    }
  }, [plots]);

  useEffect(() => {
    const filtered = filterPlots(plots, {
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : null,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
      minArea: filters.minArea ? Number(filters.minArea) : null,
      maxArea: filters.maxArea ? Number(filters.maxArea) : null,
      minLength: filters.minLength ? Number(filters.minLength) : null,
      maxLength: filters.maxLength ? Number(filters.maxLength) : null,
      minWidth: filters.minWidth ? Number(filters.minWidth) : null,
      maxWidth: filters.maxWidth ? Number(filters.maxWidth) : null,
    });
    onFilterChange?.(filtered);
  }, [filters, plots]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      minLength: "",
      maxLength: "",
      minWidth: "",
      maxWidth: "",
      facing: "all",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== "" && v !== "all"
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        {filterRanges?.priceRange?.max > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (₹)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Min ${filterRanges.priceRange.min}`}
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="number"
                placeholder={`Max ${filterRanges.priceRange.max}`}
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {filterRanges?.areaRange?.max > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area (sq ft)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Min ${Math.floor(filterRanges.areaRange.min)}`}
                value={filters.minArea}
                onChange={(e) => handleFilterChange("minArea", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="number"
                placeholder={`Max ${Math.floor(filterRanges.areaRange.max)}`}
                value={filters.maxArea}
                onChange={(e) => handleFilterChange("maxArea", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {filterRanges?.dimensionsRange?.maxLength > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Length (ft)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Min ${filterRanges.dimensionsRange.minLength}`}
                value={filters.minLength}
                onChange={(e) => handleFilterChange("minLength", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="number"
                placeholder={`Max ${filterRanges.dimensionsRange.maxLength}`}
                value={filters.maxLength}
                onChange={(e) => handleFilterChange("maxLength", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {filterRanges?.dimensionsRange?.maxWidth > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (ft)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={`Min ${filterRanges.dimensionsRange.minWidth}`}
                value={filters.minWidth}
                onChange={(e) => handleFilterChange("minWidth", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="number"
                placeholder={`Max ${filterRanges.dimensionsRange.maxWidth}`}
                value={filters.maxWidth}
                onChange={(e) => handleFilterChange("maxWidth", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        )}

        {filterRanges?.facingOptions?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facing
            </label>
            <select
              value={filters.facing}
              onChange={(e) => handleFilterChange("facing", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              {filterRanges.facingOptions.map((facing) => (
                <option key={facing} value={facing}>
                  {facing}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
