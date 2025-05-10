
// LeafletMap.jsx
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import 'leaflet-gesture-handling';
import 'leaflet-control-geocoder';
import 'leaflet-search';
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
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

    // Initialize map with advanced options
    const map = L.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
      gestureHandling: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      minZoom: 7,
      maxZoom: 18,
    }).setView([7.8731, 80.7718], 7);

    // Add multiple tile layers
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
    });

    const darkMode = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    // Add layer control
    const baseMaps = {
      "Streets": streets,
      "Satellite": satellite,
      "Terrain": terrain,
      "Dark Mode": darkMode,
    };
    L.control.layers(baseMaps).addTo(map);

    // Set Sri Lanka bounds
    const southWest = L.latLng(5.9167, 79.5167);
    const northEast = L.latLng(9.8333, 81.8833);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    // Keep map within bounds
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: true, duration: 0.5 });
    });

    // Add controls
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    L.control.fullscreen({
      position: 'topright'
    }).addTo(map);

    // Create marker cluster group
    const markersLayer = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    }).addTo(map);

    const createCustomMarker = (location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class='marker-3d'>📍</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        })
      });

      const defaultPopupOptions = {
        maxWidth: 400,
        className: 'custom-popup-wrapper'
      };

      const expandedPopupOptions = {
        maxWidth: window.innerWidth * 0.9,
        maxHeight: window.innerHeight * 0.9,
        className: 'custom-popup-wrapper expanded'
      };

      const createPopupContent = (isExpanded = false) => `
        <div class="custom-popup">
          <h3>${location.name}</h3>
          <div class="popup-description">
            ${location.description}
          </div>
          <div class="additional-content" style="display: ${isExpanded ? 'block' : 'none'}">
            <p>Additional details about ${location.name}.</p>
            <p>${location.longDes}</p>
            <div class="popup-image">
              <img src="/images/${location.image}" alt="${location.name}" />
            </div>
          </div>
          <button class="see-more-btn">${isExpanded ? 'See Less' : 'See More'}</button>
        </div>
      `;

      marker.bindPopup(createPopupContent(false), defaultPopupOptions);

      marker.on('popupopen', () => {
        const popup = marker.getPopup();
        const popupElement = popup.getElement();
        const seeMoreBtn = popupElement.querySelector('.see-more-btn');

        seeMoreBtn.addEventListener('click', () => {
          const isCurrentlyExpanded = seeMoreBtn.textContent === 'See Less';
          
          if (!isCurrentlyExpanded) {
            marker.unbindPopup();
            marker.bindPopup(createPopupContent(true), expandedPopupOptions).openPopup();
          } else {
            marker.unbindPopup();
            marker.bindPopup(createPopupContent(false), defaultPopupOptions).openPopup();
          }
        });
      });

      marker.options.title = location.name;
      return marker;
    };

    // Fetch and add location markers
    fetch('http://127.0.0.1:5000/locations')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        data.forEach(location => {
          const marker = createCustomMarker(location);
          markersLayer.addLayer(marker);
        });

        // Add search control
        const searchControl = new L.Control.Search({
          layer: markersLayer,
          propertyName: 'title',
          initial: false,
          zoom: 12,
          marker: false,
          moveToLocation: (latlng, title, map) => {
            map.setView(latlng, 14);
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

        // Add search result styling
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
        height: '100%',
        width: '100%',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative',
      }}
    />
  );
};

export default LeafletMap;

