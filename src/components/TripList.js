import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import WeatherWidget from "./WeatherWidget";
import MapWidget from "./MapWidget";

const TripList = ({
  trips,
  sortOption,
  setSortOption,
  handleEdit,
  openConfirmModal,
  openEditModal, // Отримуємо функцію як пропс
}) => {
  return (
    <div>
      <h3>Your Planned Trips</h3>
      <label className="sort-label">
        Sort by:
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="destination">Destination</option>
          <option value="budget">Budget</option>
        </select>
      </label>
      <ul className="trip-list">
        {trips.map((trip) => (
          <li key={trip.id} className="trip-card">
            <h3>Destination: {trip.destination}</h3>
            <p>Budget: ${trip.budget}</p>
            <WeatherWidget destination={trip.destination} />
            <MapWidget destination={trip.destination} />
            <div className="trip-card-actions">
              <button
                className="edit-btn"
                onClick={() => openEditModal(trip)} // Викликаємо функцію
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => openConfirmModal(trip.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

TripList.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
    })
  ).isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  openConfirmModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired, // Вказуємо, що цей пропс обов'язковий
};

export default TripList;
