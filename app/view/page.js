"use client";
import React from "react";
import Navbar from "../components/navbar";  
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function ViewLocations() {
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, "locations"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(data);
      console.log("Fetched locations:", data);
    })();
  }, []);

  const handleDelete = (id) => {
    const updated = locations.filter((loc) => loc.id !== id);
    setLocations(updated);
    deleteDoc(doc(db, "locations", id))
  };

  const handleEdit = async (id) => {
  const newName = prompt("Enter new name:");
  if (!newName || !newName.trim()) return;

  try {
    const ref = doc(db, "locations", id);
    await updateDoc(ref, {
      name: newName.trim(),
    });

    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, name: newName.trim() } : loc
      )
    );

    alert("Location updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
    alert("Failed to update location.");
  }
};

  return (
    <>
      <Navbar />
      <div
        style={{
          fontFamily: "sans-serif",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          color:"black"
        }}
      >
        <h1 style={{ textAlign: "center" }} className="text-white">📋 Your Recorded Locations</h1>

        {locations.length === 0 ? (
          <p style={{ color: "#777" }}>No locations saved yet.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              width: "100%",
              maxWidth: "600px",
            }}
          >
            {locations.map((loc) => (
              <li
                key={loc.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <strong>{loc.name}</strong>
                  <br />
                  <small>
                    {loc.latitude?.toFixed(4)}, {loc.longitude?.toFixed(4)}
                  </small>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(loc.id)}
                    style={{
                      background: "#FFA500",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loc.id)}
                    style={{
                      background: "crimson",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
