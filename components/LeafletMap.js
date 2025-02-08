

// //mappppppppp
// // LeafletMap.js
// // LeafletMap.js
// import { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
// import 'leaflet-gesture-handling';
// import 'leaflet-control-geocoder';
// import 'leaflet-search';
// import 'leaflet-search/dist/leaflet-search.min.css';
// import './LeafletMap.css';

// const LeafletMap = () => {
//   useEffect(() => {
//     // Configure default marker icons
//     delete L.Icon.Default.prototype._getIconUrl;
//     L.Icon.Default.mergeOptions({
//       iconRetinaUrl: '/images/marker-icon-2x.png',
//       iconUrl: '/images/marker-icon.png',
//       shadowUrl: '/images/marker-shadow.png',
//     });

//     // Initialize map
//     const map = L.map('map', {
//       zoomControl: true,
//       scrollWheelZoom: false,
//       gestureHandling: true,
//       zoomAnimation: true,
//       fadeAnimation: true,
//       markerZoomAnimation: true,
//     }).setView([7.8731, 80.7718], 7);

//     // Add tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     // Set Sri Lanka bounds
//     const southWest = L.latLng(5.9167, 79.5167);
//     const northEast = L.latLng(9.8333, 81.8833);
//     const bounds = L.latLngBounds(southWest, northEast);
//     map.setMaxBounds(bounds);

//     // Keep map within bounds
//     map.on('drag', () => {
//       map.panInsideBounds(bounds, { animate: false });
//     });

//     // Create marker layer group for search functionality
//     const markersLayer = new L.LayerGroup().addTo(map);

//     // Fetch and add location markers
//     fetch('http://127.0.0.1:5000/locations')
//       .then(response => response.json())
//       .then(data => {
//         data.forEach(location => {
//           // Create marker with custom icon
//           const marker = L.marker([location.latitude, location.longitude], {
//             icon: L.divIcon({
//               className: 'custom-marker',
//               html: `<div class='marker-3d'>📍</div>`,
//               iconSize: [30, 30],
//               iconAnchor: [15, 30],
//             })
//           });

//           // Add marker to layer group
//           marker.addTo(markersLayer);

//           // Add popup
//           marker.bindPopup(`
//             <b>${location.name}</b><br>
//             ${location.description}<br>
//             <img src="/images/${location.image}" width="150" height="150" alt="${location.name}" />
//           `);

//           // Add searchable title to marker
//           marker.options.title = location.name;
//         });

//         // Initialize search control after markers are added
//         const searchControl = new L.Control.Search({
//           layer: markersLayer,
//           propertyName: 'title',
//           initial: false,
//           zoom: 12,
//           marker: {
//             icon: L.divIcon({
//               className: 'search-marker',
//               // html: `<div class='marker-3d'>🔍</div>`,
//               iconSize: [30, 30],
//               iconAnchor: [15, 30],
//             })
//           },
//           textPlaceholder: "Search locations..."
//         });

//         map.addControl(searchControl);
//       })
//       .catch(error => console.error('Error fetching locations:', error));

//     // Cleanup
//     return () => map.remove();
//   }, []);

//   return (
//     <div 
//       id="map" 
//       style={{ 
//         height: '600px', 
//         width: '100%', 
//         borderRadius: '15px', 
//         boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
//       }} 
//     />
//   );
// };

// export default LeafletMap;

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import 'leaflet-gesture-handling';
import 'leaflet-control-geocoder';
import 'leaflet-search';
import 'leaflet-search/dist/leaflet-search.min.css';
import './LeafletMap.css';

const LeafletMap = () => {
  useEffect(() => {
    // Configure default marker icons
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    // Initialize map with improved options
    const map = L.map('map', {
      zoomControl: true,
      scrollWheelZoom: false,
      gestureHandling: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      minZoom: 7,
      maxZoom: 18,
    }).setView([7.8731, 80.7718], 7);

    // Add enhanced tile layer with satellite view option
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Add layer control
    const baseMaps = {
      "Streets": streets,
      "Satellite": satellite
    };
    L.control.layers(baseMaps).addTo(map);

    // Set Sri Lanka bounds
    const southWest = L.latLng(5.9167, 79.5167);
    const northEast = L.latLng(9.8333, 81.8833);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    // Keep map within bounds with smooth animation
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: true, duration: 0.5 });
    });

    // Create marker layer group for search functionality
    const markersLayer = new L.LayerGroup().addTo(map);

    // Enhanced marker creation with custom popup style
    const createCustomMarker = (location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class='marker-3d'>📍</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        })
      });

      // Create enhanced popup content with better styling
      const popupContent = `
        <div class="custom-popup">
          <h3>${location.name}</h3>
          <div class="popup-image">
            <img src="/images/${location.image}" alt="${location.name}" />
          </div>
          <div class="popup-description">
            ${location.description}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup-wrapper'
      });

      marker.options.title = location.name;
      return marker;
    };

    // Fetch and add location markers with error handling and loading state
    fetch('http://127.0.0.1:5000/locations')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        data.forEach(location => {
          const marker = createCustomMarker(location);
          marker.addTo(markersLayer);
        });

        // Initialize enhanced search control
        const searchControl = new L.Control.Search({
          layer: markersLayer,
          propertyName: 'title',
          initial: false,
          zoom: 12,
          marker: false, // Disable default search marker
          moveToLocation: (latlng, title, map) => {
            map.setView(latlng, 14); // Smooth zoom to location
            const targetMarker = markersLayer.getLayers().find(
              layer => layer.options.title === title
            );
            if (targetMarker) {
              targetMarker.openPopup();
            }
          },
          textPlaceholder: "🔍 Search locations...",
          position: 'topleft',
        }).addTo(map);

        // Add custom search result styling
        searchControl.on('search:locationfound', function(e) {
          e.layer.setIcon(L.divIcon({
            className: 'custom-marker highlighted',
            html: `<div class='marker-3d active'>📍</div>`,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
          }));
          setTimeout(() => {
            e.layer.setIcon(L.divIcon({
              className: 'custom-marker',
              html: `<div class='marker-3d'>📍</div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            }));
          }, 2000);
        });
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        // Add error message to map
        L.control.attribution({
          prefix: `<span class="error-message">⚠️ Error loading locations: ${error.message}</span>`
        }).addTo(map);
      });

    return () => map.remove();
  }, []);

  return (
    <div 
      id="map"
      style={{
        height: '600px',
        width: '100%',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative',
      }}
    />
  );
};

export default LeafletMap;