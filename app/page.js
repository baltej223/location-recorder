"use client";
import React from "react";
import Navbar from "./components/navbar";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";

console.log("Firestore instance:", db);


export default function Home() {
  const [locationName, setLocationName] = React.useState("");
  const [coords, setCoords] = React.useState(null);

  const recordLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
      },
      (err) => alert("Failed to get location: " + err.message)
    );
  };

  const handleSubmit = async () => {
    if (!coords || !locationName.trim()) {
      alert("Please record location and enter a name first.");
      return;
    }

    // const newLocation = {
    //   id: Date.now(),
    //   name: locationName.trim(),
    //   latitude: coords.latitude,
    //   longitude: coords.longitude,
    // };

    // const saved = JSON.parse(localStorage.getItem("locations") || "[]");
    // saved.push(newLocation);
    // localStorage.setItem("locations", JSON.stringify(saved));

    await addDoc(collection(db, "locations"), {
      name: locationName.trim(),
      latitude: coords.latitude,
      longitude: coords.longitude,
      createdAt: new Date(),
    });

    alert("Location added successfully!");
    setLocationName("");
    setCoords(null);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          gap: "1.5rem",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Record Your Location</h1>

        <input
          type="text"
          placeholder="Enter location name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "90%",
            maxWidth: "350px",
          }}
        />

        <button
          onClick={recordLocation}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "200px",
          }}
        >
          Record Location
        </button>

        {coords && (
          <p>
            📍 Recorded: {coords.latitude.toFixed(5)},{" "}
            {coords.longitude.toFixed(5)}
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "200px",
          }}
        >
          Submit Location
        </button>
      </div>
    </>
  );
}
