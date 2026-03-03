import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ManageProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

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
            <p>Status: {plot.status}</p>
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
      `}</style>
    </div>
  );
};

export default ManageProject;
