import React from "react";
import PropTypes from "prop-types";
import WeatherWidget from "./WeatherWidget";

const TripItem = ({
  trip,
  isEditing,
  onEdit,
  onDelete,
  onUpdate,
  onCancel,
  editingDestination,
  editingBudget,
  setEditingDestination,
  setEditingBudget,
}) => {
  return (
    <li className="trip-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editingDestination}
            onChange={(e) => setEditingDestination(e.target.value)}
          />
          <input
            type="number"
            value={editingBudget}
            onChange={(e) => setEditingBudget(e.target.value)}
          />
          <button onClick={onUpdate}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Destination: {trip.destination}</p>
          <p>Budget: {trip.budget}</p>
          <WeatherWidget city={trip.destination} />
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

TripItem.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  editingDestination: PropTypes.string.isRequired,
  editingBudget: PropTypes.string.isRequired,
  setEditingDestination: PropTypes.func.isRequired,
  setEditingBudget: PropTypes.func.isRequired,
};

export default TripItem;
