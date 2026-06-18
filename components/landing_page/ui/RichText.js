"use client";

import React from "react";

/**
 * Renders a string with **double-asterisk** emphasis as <strong>.
 * Lets translation strings carry inline bold without storing JSX.
 */
const RichText = ({ text, strongClassName = "text-white" }) => {
  if (!text) return null;
  // Capturing split → odd indexes are the emphasised segments.
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={strongClassName}>
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default RichText;
