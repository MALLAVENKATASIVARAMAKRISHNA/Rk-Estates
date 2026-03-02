"use client";

const PlotCard = ({ plot, onClick, isSelected = false, onBook }) => {
  const getStatusBadge = (status) => {
    const styles = {
      Available: "bg-green-100 text-green-700 border-green-200",
      Booked: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Sold: "bg-red-100 text-red-700 border-red-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getFacingColor = (facing) => {
    const colors = {
      North: "text-blue-600",
      South: "text-orange-600",
      East: "text-green-600",
      West: "text-yellow-600",
    };
    return colors[facing] || "text-gray-600";
  };

  const getFacingIcon = (facing) => {
    const icons = {
      North: "↑",
      South: "↓",
      East: "→",
      West: "←",
    };
    return icons[facing] || "?";
  };

  return (
    <div
      onClick={() => onClick && onClick(plot)}
      className={`
        bg-white rounded-lg shadow-md border-2 transition-all cursor-pointer
        ${isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-gray-200"}
      `}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900">Plot #{plot.plot_number}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(plot.status)}`}>
            {plot.status}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Dimensions</span>
            <span className="font-medium text-gray-900">{plot.length} x {plot.width} ft</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Area</span>
            <span className="font-medium text-gray-900">{plot.area} sq ft</span>
          </div>

          {plot.price && (
            <div className="flex justify-between">
              <span className="text-gray-500">Price</span>
              <span className="font-semibold text-green-600">₹{plot.price.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Facing</span>
            <span className={`font-medium flex items-center gap-1 ${getFacingColor(plot.facing)}`}>
              <span className="text-lg">{getFacingIcon(plot.facing)}</span>
              {plot.facing}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Position</span>
            <span className="font-medium text-gray-900">Row {plot.row_index + 1}, Col {plot.col_index + 1}</span>
          </div>
        </div>

        {plot.status === "Available" && onBook && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(plot);
            }}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PlotCard;
