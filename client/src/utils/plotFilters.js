export const filterPlots = (plots, filters) => {
  if (!plots) return [];
  
  let filtered = [...plots];

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((plot) => plot.status === filters.status);
  }

  if (filters.minPrice !== undefined && filters.minPrice !== null) {
    filtered = filtered.filter((plot) => (plot.price || 0) >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
    filtered = filtered.filter((plot) => (plot.price || 0) <= filters.maxPrice);
  }

  if (filters.minArea !== undefined && filters.minArea !== null) {
    filtered = filtered.filter((plot) => plot.area >= filters.minArea);
  }

  if (filters.maxArea !== undefined && filters.maxArea !== null) {
    filtered = filtered.filter((plot) => plot.area <= filters.maxArea);
  }

  if (filters.minLength !== undefined && filters.minLength !== null) {
    filtered = filtered.filter((plot) => plot.length >= filters.minLength);
  }

  if (filters.maxLength !== undefined && filters.maxLength !== null) {
    filtered = filtered.filter((plot) => plot.length <= filters.maxLength);
  }

  if (filters.minWidth !== undefined && filters.minWidth !== null) {
    filtered = filtered.filter((plot) => plot.width >= filters.minWidth);
  }

  if (filters.maxWidth !== undefined && filters.maxWidth !== null) {
    filtered = filtered.filter((plot) => plot.width <= filters.maxWidth);
  }

  if (filters.facing && filters.facing !== "all") {
    filtered = filtered.filter((plot) => plot.facing === filters.facing);
  }

  return filtered;
};

export const getPlotFilters = (plots) => {
  if (!plots || plots.length === 0) {
    return {
      priceRange: { min: 0, max: 0 },
      areaRange: { min: 0, max: 0 },
      dimensionsRange: { minLength: 0, maxLength: 0, minWidth: 0, maxWidth: 0 },
      facingOptions: [],
    };
  }

  const prices = plots.map((p) => p.price || 0).filter((p) => p > 0);
  const areas = plots.map((p) => p.area);
  const lengths = plots.map((p) => p.length);
  const widths = plots.map((p) => p.width);
  const facingOptions = [...new Set(plots.map((p) => p.facing))];

  return {
    priceRange: {
      min: Math.min(...prices) || 0,
      max: Math.max(...prices) || 0,
    },
    areaRange: {
      min: Math.min(...areas) || 0,
      max: Math.max(...areas) || 0,
    },
    dimensionsRange: {
      minLength: Math.min(...lengths) || 0,
      maxLength: Math.max(...lengths) || 0,
      minWidth: Math.min(...widths) || 0,
      maxWidth: Math.max(...widths) || 0,
    },
    facingOptions,
  };
};
