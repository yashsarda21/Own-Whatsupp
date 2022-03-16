import React from "react";

const Attachment = () => {
  return (
    <div>
      <svg
        className="w-6 h-6"
        fill="none"
        style={{
          width: "25px",
          height: "25px",
          cursor: "pointer",
          color: "gray",
        }}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    </div>
  );
};

export default Attachment;
