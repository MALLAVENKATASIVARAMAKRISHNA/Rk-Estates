import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const STATUSES = ['Available', 'Booked', 'Sold', 'Reserved'];

const ManageProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const handleStatusChange = async (plotId, newStatus) => {
    setUpdating(plotId);
    try {
      const res = await fetch(`/api/plots/${plotId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProject(prev => ({
          ...prev,
          plots: prev.plots.map(p =>
            p.id === plotId ? { ...p, status: newStatus } : p
          ),
        }));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
    setUpdating(null);
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then(res => res.json())
        .then(data => {
          setProject(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error:', err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="manage-project">
      <h1>{project.name}</h1>
      <p>Location: {project.location}</p>
      <div className="plots-grid">
        {project.plots && project.plots.map((plot) => (
          <div key={plot.id} className="plot-card">
            <h3>Plot {plot.plotNumber}</h3>
            <select
              value={plot.status}
              onChange={(e) => handleStatusChange(plot.id, e.target.value)}
              disabled={updating === plot.id}
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <style jsx>{`
        .manage-project {
          padding: 20px;
        }
        .plots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .plot-card {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
        }
        .plot-card select {
          margin-top: 8px;
          padding: 6px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default ManageProject;
