"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PlotViewer = ({ length, width }) => {
  return (
    <div
      style={{
        width: `${width * 10}px`,
        height: `${length * 10}px`,
        backgroundColor: "#4CAF50",
        border: "2px solid #2E7D32",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "14px",
      }}
    >
      {length} x {width} ft
    </div>
  );
};

const PlotDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPlot();
    }
  }, [id]);

  const fetchPlot = async () => {
    try {
      const response = await fetch(`/api/plots/${id}`);
      if (!response.ok) throw new Error("Failed to fetch plot");
      const data = await response.json();
      setPlot(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        Error: {error}
      </div>
    );
  }

  if (!plot) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Plot not found
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Plot #{plot.plot_number}</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <PlotViewer length={plot.length} width={plot.width} />
      </div>

      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <div>
          <strong>Price: </strong>₹{plot.price?.toLocaleString()}
        </div>
        <div>
          <strong>Status: </strong>
          <span style={{
            color: plot.status === "Available" ? "green" : 
                   plot.status === "Booked" ? "orange" : "red"
          }}>
            {plot.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlotDetail;
