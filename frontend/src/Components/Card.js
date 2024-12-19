import React from 'react';
import '../Styles/DeleteCard.css'; // Importing CSS styles

const Card = ({ title, description, onConfirm, onCancel }) => {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-content">
          <p className="card-heading">{title}</p>
          <p className="card-description">{description}</p>
        </div>
        <div className="card-button-wrapper">
          <button className="card-button secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="card-button primary" onClick={onConfirm}>
            Delete
          </button>
        </div>
        <button className="exit-button" onClick={onCancel}>
          <svg height="20px" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;