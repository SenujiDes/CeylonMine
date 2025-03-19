// import { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LeafletMap = () => {
//   useEffect(() => {
//     // Initialize the map
//     const map = L.map('map').setView([7.8731, 80.7718], 7);

//     // Add a tile layer (OpenStreetMap)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     // Define the bounding box for Sri Lanka
//     const southWest = L.latLng(5.9167, 79.5167); // Southwest corner of Sri Lanka
//     const northEast = L.latLng(9.8333, 81.8833); // Northeast corner of Sri Lanka
//     const bounds = L.latLngBounds(southWest, northEast);

//     // Restrict the map view to the bounding box
//     map.setMaxBounds(bounds);
//     map.on('drag', () => {
//       map.panInsideBounds(bounds, { animate: false });
//     });

//     // Fetch locations from the Flask backend
//     fetch('http://127.0.0.1:5000/locations')
//       .then(response => response.json())
//       .then(data => {
        
//         // Loop through the data and add markers
//         data.forEach(location => {
//           const marker = L.marker([location.latitude, location.longitude]).addTo(map);
//           marker.bindPopup(`<b>${location.name}</b><br>${location.description}`);
//         });
//       })
      
//       .catch(error => {
//         console.error('Error fetching locations:', error);
//       });

//     //   const marker = L.marker([7, 81]).addTo(map);
//     //       marker.bindPopup(`<b>abc</b>`);

//     // Cleanup function
//     return () => {
//       map.remove();
//     };
//   }, []);

//   return <div id="map" style={{ height: '600px', width: '100%' }} />;
// };

// export default LeafletMap;


// ---------------------------------

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  useEffect(() => {
    // Fix for default marker icon issue
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    // Initialize the map
    const map = L.map('map').setView([7.8731, 80.7718], 7);

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define the bounding box for Sri Lanka
    const southWest = L.latLng(5.9167, 79.5167); // Southwest corner of Sri Lanka
    const northEast = L.latLng(9.8333, 81.8833); // Northeast corner of Sri Lanka
    const bounds = L.latLngBounds(southWest, northEast);

    // Restrict the map view to the bounding box
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });

    // Fetch locations from the Flask backend
    fetch('http://127.0.0.1:5000/locations')
      .then(response => response.json())
      .then(data => {
        // Loop through the data and add markers
        data.forEach(location => {
          const marker = L.marker([location.latitude, location.longitude]).addTo(map);
          marker.bindPopup(`<b>${location.name}</b><br>${location.description}`);
        });
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }} />;
};

export default LeafletMap;