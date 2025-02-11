import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

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

const MapMore = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [rotation, setRotation] = useState(0);

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
      {/* Button Container */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 1000, 
        display: 'flex', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        width: '90%',
        margin: '0', // Ensure no margin
        boxSizing: 'border-box' // Ensure padding and border are included in the element's total width and height
      }}>
        <button style={{
          background: 'linear-gradient(145deg, #111, #222)',
          color: '#fff',
          border: '1px solid #444',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          outline: 'none',
          minWidth: '120px',
          textAlign: 'center',
          margin: '0', // Ensure no margin
          boxSizing: 'border-box' // Ensure padding and border are included in the element's total width and height
        }}
        onMouseOver={(e) => e.target.style.boxShadow = '5px 5px 15px rgba(0,0,0,0.7), -5px -5px 15px rgba(255,255,255,0.2)'}
        onMouseOut={(e) => e.target.style.boxShadow = '3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)'}
        onClick={() => router.push('/')}
        >
          Map
        </button>
        <button style={{
          background: 'linear-gradient(145deg, #111, #222)',
          color: '#fff',
          border: '1px solid #444',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          outline: 'none',
          minWidth: '120px',
          textAlign: 'center',
          margin: '0', // Ensure no margin
          boxSizing: 'border-box' // Ensure padding and border are included in the element's total width and height
        }}
        onMouseOver={(e) => e.target.style.boxShadow = '5px 5px 15px rgba(0,0,0,0.7), -5px -5px 15px rgba(255,255,255,0.2)'}
        onMouseOut={(e) => e.target.style.boxShadow = '3px 3px 10px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.1)'}
        onClick={() => router.push('/map-more')}
        >
          Map More
        </button>
      </div>

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
                  <div className="card-label" style={{ background: material.color }}>
                    {material.title}
                  </div>
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
          padding: 2rem;
        }

        .content-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 4rem);
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .carousel-container {
          perspective: 2000px;
          width: 600px;
          height: 400px;
          position: relative;
          cursor: grab;
          flex-shrink: 0;
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
          transition: transform 0.3s ease;
        }

        .item-content img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.2rem;
          background: rgba(0,0,0,0.7);
          color: white;
          font-size: 1.4rem;
          font-weight: 600;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          backdrop-filter: blur(5px);
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          transition: all 0.3s ease;
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
          background: rgba(30, 30, 30, 0.95);
          border-radius: 20px;
          padding: 2.5rem;
          width: 450px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          transform: translateY(-20px);
        }

        .material-title {
          color: var(--primary-color);
          font-size: 2.8rem;
          margin-bottom: 1.5rem;
          text-align: center;
          letter-spacing: -0.5px;
          position: relative;
          padding-bottom: 1rem;
        }

        .material-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--primary-color);
          border-radius: 2px;
        }

        .material-description {
          color: rgba(255,255,255,0.85);
          font-size: 1.15rem;
          line-height: 1.7;
          text-align: center;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }

        .property-card {
          background: linear-gradient(to bottom right, rgba(50, 50, 50, 0.6), rgba(40, 40, 40, 0.8));
          border-radius: 15px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          transition: all 0.3s ease;
          border-left: 3px solid var(--primary-color);
        }

        .property-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #1a1a1a;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .property-text {
          color: rgba(255,255,255,0.9);
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 300;
        }

        .navigation-dots {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1.2rem;
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

        @media (max-width: 1024px) {
          .content-wrapper {
            flex-direction: column;
            padding-top: 6rem;
            gap: 4rem;
          }

          .carousel-container {
            width: 90%;
            height: 400px;
          }

          .info-panel {
            width: 90%;
            max-width: 500px;
            transform: none;
          }
        }

        @media (max-width: 640px) {
          .container {
            padding: 1.5rem;
          }

          .card-label {
            font-size: 1.2rem;
            padding: 1rem;
          }

          .material-title {
            font-size: 2.2rem;
          }

          .property-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MapMore;