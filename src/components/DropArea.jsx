import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop, full }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <>
      {full === 1 ? (
        <section
          style={{ display: "flex" }}
          onDragEnter={() => setShowDrop(true)}
          onDragLeave={() => setShowDrop(false)}
          onDrop={() => {
            onDrop();
            setShowDrop(false);
          }}
          className={showDrop ? "end_drop_area" : "end_hide_drop"}
          onDragOver={(e) => e.preventDefault()}
        >
          Drop
        </section>
      ) : (
        <section
          onDragEnter={() => setShowDrop(true)}
          onDragLeave={() => setShowDrop(false)}
          onDrop={() => {
            onDrop();
            setShowDrop(false);
          }}
          className={showDrop ? "drop_area" : "hide_drop"}
          onDragOver={(e) => e.preventDefault()}
        >
          Drop
        </section>
      )}
    </>
  );
};

export default DropArea;
