import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

const MapMore = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

  const materials = [
    { 
      src: '/images/clay.jpg', 
      title: 'Clay',
      description: 'Fine-grained natural rock or soil material',
      properties: ['Plastic when wet', 'High porosity', 'Natural resource'],
      color: '#9c7c5c'
    },
    { 
      src: '/images/Quartz.jpg', 
      title: 'Quartz',
      description: 'Hard crystalline mineral of silicon and oxygen',
      properties: ['7 Mohs hardness', 'Hexagonal structure', 'Piezoelectric'],
      color: '#d4d4d4'
    },
    { 
      src: '/images/rock.jpg', 
      title: 'Rock',
      description: 'Solid mineral mass forming Earth\'s crust',
      properties: ['Igneous/Sedimentary', 'Various compositions', 'Foundation material'],
      color: '#6b5b4d'
    },
    { 
      src: '/images/sand.jpg', 
      title: 'Sand',
      description: 'Granular material of rock and minerals',
      properties: ['0.0625-2mm grains', 'High permeability', 'Silica dominant'],
      color: '#e7d0a7'
    },
    { 
      src: '/images/Silica.jpg', 
      title: 'Silica',
      description: 'Chemical compound of SiO₂',
      properties: ['High melting point', 'Glass production', 'Semiconductor use'],
      color: '#b4c7d6'
    },
  ];

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    setSelectedIndex(prev => (prev + delta + materials.length) % materials.length);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const diff = currentX - startX;
    setRotation(rotation + diff * 0.3);
    setStartX(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to nearest item
    const nearestIndex = Math.round(rotation / (360 / materials.length));
    setSelectedIndex((nearestIndex % materials.length + materials.length) % materials.length);
    setRotation(nearestIndex * (360 / materials.length));
  };

  useEffect(() => {
    const container = carouselRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="container">
      <button className="back-btn" onClick={() => router.back()}>
        <span className="arrow">←</span>
        <span className="text">Back</span>
      </button>

      <div className="content-wrapper">
        <div 
          className="carousel-container"
          ref={carouselRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            className="carousel-track"
            style={{ 
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {materials.map((material, index) => (
              <div 
                key={index}
                className={`carousel-item ${index === selectedIndex ? 'active' : ''}`}
                style={{ 
                  '--item-color': material.color,
                  transform: `rotateY(${index * (360 / materials.length)}deg) translateZ(400px)`
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="item-content">
                  <img src={material.src} alt={material.title} />
                  <div className="glow-effect" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-panel">
          <h2 className="material-title">{materials[selectedIndex].title}</h2>
          <p className="material-description">{materials[selectedIndex].description}</p>
          
          <div className="properties-grid">
            {materials[selectedIndex].properties.map((prop, i) => (
              <div key={i} className="property-card">
                <div className="property-icon">{i + 1}</div>
                <div className="property-text">{prop}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="navigation-dots">
        {materials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === selectedIndex ? 'active' : ''}`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      <style jsx global>{`
        :root {
          --primary-color: ${materials[selectedIndex].color};
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(45deg, #1a1a1a 30%, #2d2d2d 100%);
          position: relative;
          overflow: hidden;
        }

        .back-btn {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 0.8rem 1.5rem;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          z-index: 1000;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .content-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          gap: 5rem;
          padding: 2rem;
        }

        .carousel-container {
          perspective: 2000px;
          width: 800px;
          height: 500px;
          position: relative;
          cursor: grab;
        }

        .carousel-track {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .carousel-item {
          position: absolute;
          width: 300px;
          height: 400px;
          transition: all 0.3s ease;
        }

        .carousel-item.active {
          filter: brightness(1.2);
          transform: scale(1.1) translateZ(100px) !important;
        }

        .item-content {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          transform-style: preserve-3d;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        }

        .item-content img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .glow-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 0%, var(--primary-color), transparent 70%);
          opacity: 0.3;
          mix-blend-mode: screen;
        }

        .info-panel {
          background: rgba(30, 30, 30, 0.9);
          border-radius: 20px;
          padding: 2rem;
          width: 400px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .material-title {
          color: var(--primary-color);
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .material-description {
          color: rgba(255,255,255,0.9);
          font-size: 1.1rem;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 2rem;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .property-card {
          background: rgba(50, 50, 50, 0.6);
          border-radius: 15px;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .property-card:hover {
          background: rgba(60, 60, 60, 0.8);
          transform: translateY(-3px);
        }

        .property-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #1a1a1a;
        }

        .property-text {
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .navigation-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            padding: 6rem 1rem 2rem;
          }

          .carousel-container {
            width: 100%;
            height: 400px;
            perspective: 1000px;
          }

          .carousel-item {
            width: 250px;
            height: 350px;
          }

          .info-panel {
            width: 100%;
            max-width: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default MapMore;