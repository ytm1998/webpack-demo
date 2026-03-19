import React from 'react';
import './ImageGallery.scss';

const images = [
  { id: 1, alt: '图片 1', src: 'https://picsum.photos/200/200?random=1' },
  { id: 2, alt: '图片 2', src: 'https://picsum.photos/200/200?random=2' },
  { id: 3, alt: '图片 3', src: 'https://picsum.photos/200/200?random=3' },
];

export const ImageGallery: React.FC = () => {
  return (
    <div className="image-gallery">
      {images.map(img => (
        <img key={img.id} src={img.src} alt={img.alt} className="gallery-image" />
      ))}
    </div>
  );
};
