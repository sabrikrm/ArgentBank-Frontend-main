import React from "react";
// répresent les colonnes de la page d'accueil
const FeatureItem = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
