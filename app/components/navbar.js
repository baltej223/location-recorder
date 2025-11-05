"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#0070f3",
        color: "white",
        flexWrap: "wrap",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", fontWeight: "600" }}>🌍 Location Tracker</h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "0.5rem",
        }}
      >
        <Link
          href="/"
          style={{
            color: pathname === "/" ? "#FFD700" : "white",
            textDecoration: "none",
            fontWeight: pathname === "/" ? "600" : "400",
          }}
        >
          Record
        </Link>
        <Link
          href="/view"
          style={{
            color: pathname === "/view" ? "#FFD700" : "white",
            textDecoration: "none",
            fontWeight: pathname === "/view" ? "600" : "400",
          }}
        >
          View
        </Link>
      </div>
    </nav>
  );
}
