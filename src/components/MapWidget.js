import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapWidget = ({ destination }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!destination) return;

      if (!apiKey) {
        console.error("OpenCage API key is missing!");
        setError("API key is not set. Please configure it in the environment.");
        return;
      }

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            destination
          )}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setCoordinates({ lat, lng });
        } else {
          console.error("No coordinates found for destination:", destination);
          setError("No coordinates found");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setError("Error fetching coordinates");
      }
    };

    fetchCoordinates();
  }, [destination, apiKey]);

  useEffect(() => {
    if (coordinates) {
      const mapId = `map-${destination.replace(/\s/g, "_")}`;
      const map = L.map(mapId, {
        center: [coordinates.lat, coordinates.lng],
        zoom: 12,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([coordinates.lat, coordinates.lng]).addTo(map);

      // Ensure map resizes correctly
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      return () => {
        map?.remove();
      };
    }
  }, [coordinates, destination]);

  return (
    <div>
      {error ? (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={() => setError(null)}>Retry</button>
        </div>
      ) : (
        <div
          id={`map-${destination.replace(/\s/g, "_")}`}
          style={{
            height: "300px",
            width: "300px",
            margin: "10px auto",
            border: "1px solid lightgray",
            borderRadius: "8px",
          }}
        >
          {coordinates ? null : "Loading map..."}
        </div>
      )}
    </div>
  );
};

MapWidget.propTypes = {
  destination: PropTypes.string.isRequired,
};

export default MapWidget;
