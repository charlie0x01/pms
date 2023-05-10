import React from "react";

const LoadingSpinner = ({ showText }) => {
  return (
    <div class="loading-spinner">
      <div class="spinner-container">
        <div class="spinner"></div>
        {showText && <div class="spinner-text">Loading...</div>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
