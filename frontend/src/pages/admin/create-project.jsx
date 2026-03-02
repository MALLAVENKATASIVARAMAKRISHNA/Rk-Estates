import React, { useState } from 'react';
import './create-project.css';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    landLength: '',
    landWidth: '',
    numberOfPlots: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const numPlots = parseInt(formData.numberOfPlots) || 0;
  const landLength = parseFloat(formData.landLength) || 0;
  const landWidth = parseFloat(formData.landWidth) || 0;

  const cols = Math.ceil(Math.sqrt(numPlots));
  const rows = Math.ceil(numPlots / cols);
  const plotLength = cols > 0 ? landLength / cols : 0;
  const plotWidth = rows > 0 ? landWidth / rows : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="create-project">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="landLength">Land Length (ft)</label>
          <input
            type="number"
            id="landLength"
            name="landLength"
            value={formData.landLength}
            onChange={handleChange}
            placeholder="Enter land length"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="landWidth">Land Width (ft)</label>
          <input
            type="number"
            id="landWidth"
            name="landWidth"
            value={formData.landWidth}
            onChange={handleChange}
            placeholder="Enter land width"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPlots">Number of Plots</label>
          <input
            type="number"
            id="numberOfPlots"
            name="numberOfPlots"
            value={formData.numberOfPlots}
            onChange={handleChange}
            placeholder="Enter number of plots"
            required
          />
        </div>

        {numPlots > 0 && (
          <div className="grid-info">
            <p>Grid Size: {rows} rows × {cols} cols</p>
            <p>Individual Plot: {plotLength.toFixed(2)} ft × {plotWidth.toFixed(2)} ft</p>
          </div>
        )}

        <button type="submit" className="submit-btn">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
