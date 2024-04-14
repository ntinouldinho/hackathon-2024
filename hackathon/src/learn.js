import React, { useEffect, useState } from 'react';
import importedDescriptions from "./planet_info.json"; // Ensure the path to planet_info.json is correct
//import './LearnStyles.css'; // Ensure the path to LearnStyles.css is correct

export const Learn = ({ planet }) => {
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    if (planet && importedDescriptions[planet]) {
      // Convert object of descriptions into an array of description strings
      const descriptionArray = Object.values(importedDescriptions[planet]);
      setDescriptions(descriptionArray);
    } else {
      // Reset descriptions when there is no selected planet or if the planet is not found in the data
      setDescriptions([]);
    }
  }, [planet]);

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">{`Interesting Facts about ${planet}`}</h1>
          </div>
          <div className="modal-body">
            {/* Render a paragraph for each description in the descriptions array */}
            {descriptions.map((description, index) => (
              <p key={index}>{description}</p>
            ))}
          </div>
          <div className="modal-footer">
            {/* Modal footer content or buttons can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};
