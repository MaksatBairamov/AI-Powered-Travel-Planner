import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "./ConfirmModal";
import CurrencyConverter from "./CurrencyConverter";
import BudgetPlanner from "./BudgetPlanner";
import FormTrip from "./FormTrip";
import TripList from "./TripList";
import { exportTripsToDocx } from "./ExportDocx";
import EditModal from "./EditModal";

const PlanTrip = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [editingTripId, setEditingTripId] = useState(null);
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [sortOption, setSortOption] = useState("destination");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tripBeingEdited, setTripBeingEdited] = useState(null);

  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("trips");
    return savedTrips ? JSON.parse(savedTrips) : [];
  });

  const openEditModal = (trip) => {
    setTripBeingEdited(trip);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setTripBeingEdited(null);
    setEditModalVisible(false);
  };

  const handleSaveEditedTrip = (updatedTrip) => {
    console.log("Saving updated trip:", updatedTrip);
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip))
    );
    closeEditModal();
    displayMessage("Trip updated successfully!");
  };

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !budget || parseFloat(budget) <= 0) {
      displayMessage("Please enter a valid destination and budget!");
      return;
    }
    const newTrip = {
      id: uuidv4(),
      destination,
      budget: parseFloat(budget),
    };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    resetForm();
    displayMessage("Trip added successfully!");
  };

  const handleUpdate = () => {
    if (!destination || !budget) {
      displayMessage("Please fill in all fields!");
      return;
    }
    setTrips(
      trips.map((trip) =>
        trip.id === editingTripId
          ? { ...trip, destination, budget: parseFloat(budget) }
          : trip
      )
    );
    resetForm();
    displayMessage("Trip updated successfully!");
  };

  const handleEdit = (trip) => {
    setEditingTripId(trip.id);
    setDestination(trip.destination);
    setBudget(trip.budget);
  };

  const openConfirmModal = (tripId) => {
    setTripToDelete(tripId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setTripToDelete(null);
    setShowConfirmModal(false);
  };

  const confirmDelete = () => {
    setTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== tripToDelete)
    );
    closeConfirmModal();
    displayMessage("Trip deleted successfully!");
  };

  const resetForm = () => {
    setDestination("");
    setBudget("");
    setEditingTripId(null);
  };

  const displayMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const sortedTrips = useMemo(() => {
    return [...trips].sort((a, b) => {
      if (sortOption === "destination") {
        return a.destination.localeCompare(b.destination);
      } else if (sortOption === "budget") {
        return a.budget - b.budget;
      }
      return 0;
    });
  }, [trips, sortOption]);

  return (
    <div className="plan-trip-container">
      <h2>Plan Your Trip</h2>
      <FormTrip
        destination={destination}
        setDestination={setDestination}
        budget={budget}
        setBudget={setBudget}
        editingTripId={editingTripId}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        exportTripsToDocx={() => exportTripsToDocx(trips)}
      />
      {successMessage && <p className="success-message">{successMessage}</p>}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={confirmDelete}
          onCancel={closeConfirmModal}
          message="Are you sure you want to delete this trip?"
        />
      )}
      <CurrencyConverter />
      <BudgetPlanner />
      <div className="trip-list">
        <TripList
          trips={sortedTrips}
          sortOption={sortOption}
          setSortOption={setSortOption}
          handleEdit={handleEdit}
          openConfirmModal={openConfirmModal}
          openEditModal={openEditModal}
        />
      </div>
      {editModalVisible && (
        <EditModal
          trip={tripBeingEdited}
          onSave={handleSaveEditedTrip}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
};

export default PlanTrip;
