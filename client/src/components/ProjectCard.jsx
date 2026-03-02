"use client";

import Link from "next/link";

const ProjectCard = ({ id, name, location, description, totalPlots, availablePlots = 0, bookedPlots = 0, soldPlots = 0 }) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-2 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span className="font-medium">Total Plots</span>
            <span className="text-lg font-bold text-gray-900">{totalPlots}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              {availablePlots} Available
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
              {bookedPlots} Booked
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
              {soldPlots} Sold
            </span>
          </div>
        </div>

        <div className="mt-4">
          <span className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
