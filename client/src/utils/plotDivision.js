export const getGridDimensions = (plots) => {
  if (!plots || plots.length === 0) {
    return { rows: 1, cols: 1 };
  }

  const maxRowIndex = Math.max(...plots.map((plot) => plot.row_index));
  const maxColIndex = Math.max(...plots.map((plot) => plot.col_index));

  return {
    rows: maxRowIndex + 1,
    cols: maxColIndex + 1,
  };
};

export const getPlotByPosition = (plots, row, col) => {
  return plots?.find((plot) => plot.row_index === row && plot.col_index === col) || null;
};

export const groupPlotsByStatus = (plots) => {
  return plots?.reduce(
    (acc, plot) => {
      if (!acc[plot.status]) {
        acc[plot.status] = [];
      }
      acc[plot.status].push(plot);
      return acc;
    },
    { Available: [], Booked: [], Sold: [] }
  );
};

export const getStatusCounts = (plots) => {
  const counts = { Available: 0, Booked: 0, Sold: 0 };
  plots?.forEach((plot) => {
    if (counts.hasOwnProperty(plot.status)) {
      counts[plot.status]++;
    }
  });
  return counts;
};
