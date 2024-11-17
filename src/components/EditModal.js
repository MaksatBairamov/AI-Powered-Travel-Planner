import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles.css"; // Додайте стилі для модального вікна

const EditModal = ({ trip, onSave, onCancel }) => {
  const [destination, setDestination] = useState(trip.destination);
  const [budget, setBudget] = useState(trip.budget);

  const handleSave = () => {
    onSave({ ...trip, destination, budget: parseFloat(budget) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Trip</h3>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  trip: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditModal;
