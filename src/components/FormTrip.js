import React from "react";
import PropTypes from "prop-types";

const FormTrip = ({
  destination,
  setDestination,
  budget,
  setBudget,
  editingTripId,
  handleSubmit,
  handleUpdate,
  exportTripsToDocx,
}) => {
  return (
    <form className="plan-trip-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="destination">Destination:</label>
        <input
          id="destination"
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="budget">Budget:</label>
        <input
          id="budget"
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          min="0"
          required
        />
      </div>

      <div className="button-group">
        {editingTripId ? (
          <button type="button" onClick={handleUpdate} className="update-btn">
            Update Trip
          </button>
        ) : (
          <button type="submit" className="add-trip-btn">
            Add Trip
          </button>
        )}
        <button
          type="button"
          className="export-btn"
          onClick={exportTripsToDocx}
        >
          Export Trips
        </button>
      </div>
    </form>
  );
};

FormTrip.propTypes = {
  destination: PropTypes.string.isRequired,
  setDestination: PropTypes.func.isRequired,
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setBudget: PropTypes.func.isRequired,
  editingTripId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  exportTripsToDocx: PropTypes.func.isRequired,
};

export default FormTrip;
