

// import dynamic from 'next/dynamic';
// import { Container } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const MapComponent = dynamic(() => import('./LeafletMap'), {
//   ssr: false,
// });

// const Map = () => {
//   const [isPopped, setIsPopped] = useState(false);
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (showSplash) {
//     return (
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         background: '#000',
//         color: '#fff',
//         fontSize: '2rem',
//         fontWeight: 'bold',
//         flexDirection: 'column'
//       }}>
//         <Image 
//           src="/images/Map.png"
//           alt="3D Map"
//           width={300} 
//           height={300}
//           style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}
//         /> 
//         Welcome to the Map
//       </div>
//     );
//   }

//   return (
//     <div style={{ 
//       background: '#1e1e1e', 
//       minHeight: '100vh', 
//       display: 'flex', 
//       flexDirection: 'column', 
//       alignItems: 'center', 
//       justifyContent: 'center', 
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif'
//     }}>
//       <Container style={{
//         background: '#000',
//         borderRadius: '20px',
//         boxShadow: '0 10px 30px rgba(255,255,255,0.2)',
//         padding: '0px',
//         maxWidth: '1200px',
//         width: '100%',
//         transition: 'all 0.3s ease-in-out',
//         border: '2px solid #444',
//         overflow: 'hidden',
//         cursor: 'pointer',
//         transform: isPopped ? 'scale(1.1)' : 'scale(1)',
//         transition: 'transform 0.3s ease-in-out',
//       }}
//       onClick={() => setIsPopped(!isPopped)}
//       >
//         <div style={{
//           borderRadius: '20px',
//           overflow: 'hidden',
//           boxShadow: isPopped ? '0 20px 50px rgba(255, 255, 255, 0.5)' : '0 15px 30px rgba(255, 255, 255, 0.3)',
//           backgroundColor: '#0b0f19',
//           padding: '0px',
//           height: '85vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           border: '2px solid rgba(255,255,255,0.2)'
//         }}>
//           <MapComponent />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Map;

import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
//import Image from 'next/image';

const MapComponent = dynamic(() => import('./LeafletMap'), {
  ssr: false,
});

const Map = () => {
  const [isPopped, setIsPopped] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        flexDirection: 'column'
      }}>
        {/* <Image 
          src="/images/earth.gif"
          alt="3D Map"
          width={800} 
          height={500}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}
        />  */}
        Welcome to the Map
      </div>
    );
  }

  
  // ff
  return (
    <div style={{ 
      background: '#1e1e1e', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Container style={{
        background: '#000',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(255,255,255,0.2)',
        padding: '0px',
        maxWidth: '1200px',
        width: '100%',
        transition: 'all 0.3s ease-in-out',
        border: '2px solid #444',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isPopped ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
        height: '85vh',
      }}
      onClick={() => setIsPopped(!isPopped)}
      >
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isPopped ? '0 20px 50px rgba(255, 255, 255, 0.5)' : '0 15px 30px rgba(255, 255, 255, 0.3)',
          backgroundColor: '#0b0f19',
          padding: '0px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          <MapComponent />
        </div>
      </Container>
    </div>
  );
};

export default Map;