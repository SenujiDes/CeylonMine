// "use client";

// import dynamic from "next/dynamic";

// const MapComponent = dynamic(() => import("./LeafletMap"), {
//   ssr: false, // Ensures Leaflet loads only on the client side
// });

// const Map = () => {
//   return (
//     <div>
//       <h1>Sri Lanka Map</h1>
//       <MapComponent />
//     </div>
//   );
// };

// export default Map;

"use client";

import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ FIXED: Updated from 'next/router'

const MapComponent = dynamic(() => import("./LeafletMap"), {
  ssr: false, // ✅ Ensures Leaflet loads only on the client side
});

const Map = () => {
  const [isPopped, setIsPopped] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  // Hide splash screen after 1.5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (showSplash) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //         background: "#000",
  //         color: "#fff",
  //         fontSize: "2rem",
  //         fontWeight: "bold",
  //         flexDirection: "column",
  //         textAlign: "center",
  //       }}
  //     >
  //       Welcome to the Map
  //     </div>
  //   );
  // }

  return (
    <div
      style={{
        background: "#1e1e1e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navigation Buttons */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          width: "90%",
        }}
      >
        {[
          { label: "Map", route: "/" },
          { label: "Map More", route: "/map-more" },
        ].map(({ label, route }, index) => (
          <button
            key={index}
            style={{
              background: "linear-gradient(145deg, #111, #222)",
              color: "#fff",
              border: "1px solid #444",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "10px",
              boxShadow:
                "3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              outline: "none",
              minWidth: "120px",
              textAlign: "center",
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow =
                "5px 5px 15px rgba(0,0,0,0.7), -5px -5px 15px rgba(255,255,255,0.2)")
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow =
                "3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)")
            }
            onClick={() => router.push(route)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <Container
        style={{
          background: "#000",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(255,255,255,0.2)",
          padding: "0px",
          maxWidth: "1200px",
          width: "100%",
          border: "2px solid #444",
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out",
          height: "85vh",
          cursor: "pointer",
        }}
        onClick={() => setIsPopped(!isPopped)}
      >
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: isPopped
              ? "0 20px 50px rgba(255, 255, 255, 0.5)"
              : "0 15px 30px rgba(255, 255, 255, 0.3)",
            backgroundColor: "#0b0f19",
            padding: "0px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <MapComponent />
        </div>
      </Container>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          button {
            padding: 10px 16px;
            font-size: 14px;
            min-width: 100px;
          }
        }
        @media (max-width: 480px) {
          button {
            padding: 8px 12px;
            font-size: 12px;
            min-width: 90px;
          }
        }
      `}</style>
    </div>
  );
};

export default Map;
