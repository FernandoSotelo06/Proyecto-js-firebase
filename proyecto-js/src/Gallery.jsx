import React from "react";

export const Gallery = () => {
    const images = [
        "/images/foto-1.jpg",
        "/images/foto-2.png",
        "/images/foto-3.jpg",
        "/images/foto-4.jpg",
        "/images/foto-5.jpg",
        "/images/foto-6.jpg",
      ];
      

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Imagen ${index + 1}`} className="gallery-image" />
        </div>
      ))}
    </div>
  );
};
