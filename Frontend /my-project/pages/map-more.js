import { useRouter } from 'next/router';

const MapMore = () => {
  const router = useRouter();

  return (
    <div style={{ 
      background: '#1e1e1e', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      margin: '0', // Ensure no margin
      boxSizing: 'border-box' // Ensure padding and border are included in the element's total width and height
    }}>
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
        >
          Map More
        </button>
      </div>

      {/* Sri Lankan Image */}
      <div style={{ 
        marginTop: '100px', 
        display: 'flex', 
        justifyContent: 'flex-start', // Align more to the left side
        alignItems: 'center',
        width: '100%' // Ensure the container takes full width
      }}>
        <img src="/images/Srilanka.png" alt="Sri Lanka" style={{ 
          maxWidth: '30%', // Make the image smaller
          height: 'auto', 
          borderRadius: '10px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
        }} />
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default MapMore;
