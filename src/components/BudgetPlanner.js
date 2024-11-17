import React, { useState } from "react";

const BudgetPlanner = () => {
  const [days, setDays] = useState(0);
  const [accommodation, setAccommodation] = useState(0);
  const [food, setFood] = useState(0);
  const [transport, setTransport] = useState(0);
  const [miscellaneous, setMiscellaneous] = useState(0);

  const calculateTotal = () => {
    return (
      days *
        (parseFloat(accommodation) + parseFloat(food) + parseFloat(transport)) +
      parseFloat(miscellaneous)
    );
  };

  return (
    <div className="budget-planner">
      <h3>Budget Planner</h3>
      <label>
        Number of Days:
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </label>
      <label>
        Accommodation (per day):
        <input
          type="number"
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
        />
      </label>
      <label>
        Food (per day):
        <input
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
      </label>
      <label>
        Transport (per day):
        <input
          type="number"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />
      </label>
      <label>
        Miscellaneous:
        <input
          type="number"
          value={miscellaneous}
          onChange={(e) => setMiscellaneous(e.target.value)}
        />
      </label>
      <h4>Total Budget: ${calculateTotal().toFixed(2)}</h4>
    </div>
  );
};

export default BudgetPlanner;
