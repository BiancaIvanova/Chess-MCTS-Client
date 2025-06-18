import React from 'react';
import { HashLoader } from 'react-spinners';
import './ErrorDisplay.css';

const getSpinnerColor = () => {
    if (document.body.classList.contains('dark-mode')) {
        return '#bfcaff';
    }
    return '#48486e';
};
 
const ErrorDisplay = ({ loading, message, subMessage, showMessage, minLoadingTime = 1000 }) => {
    return (
        <div className="error-display-container">
        <HashLoader color={getSpinnerColor()} loading={loading} size={60} />
        
        {loading && <p className="error-message">Loading...</p>}
        {!loading && showMessage && message && <p className="error-message">{message}</p>}
        {!loading && showMessage && subMessage && <p className="error-submessage">{subMessage}</p>}
        </div>
    );
 };
 
 export default ErrorDisplay;
