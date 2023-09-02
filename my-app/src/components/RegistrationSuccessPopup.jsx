import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationSuccessPopup.css"; // Import your CSS file for styling

const RegistrationSuccessPopup = ({ manufacturerAddress, manufacturerId, onClose, error }) => {
  return (
    <div className="popup-container"> {/* Apply a CSS class for the container */}
      <div className="popup-content"> {/* Apply a CSS class for the content */}
        {error ? (
          <div>
            <p className="error-message">{error}</p> {/* Apply the error message style */}
            {error === "Manufacturer is already registered." && (
              <Link to="/login" className="login-button-error">Go to Login</Link> 
            )}
          </div>
        ) : (
          <>
            <h2 className="topic">Registration Successful!</h2>
            <p>Manufacturer Address: {manufacturerAddress}</p>
            <p>Manufacturer ID: {manufacturerId}</p>
            <button className="close-button" onClick={onClose}>Close</button>
            <Link to="/login" className="login-link">Go to Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationSuccessPopup;
