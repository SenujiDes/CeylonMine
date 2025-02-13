import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./LeafletMap'), {
  ssr: false, // Ensure Leaflet loads only on the client
});

const Map = () => {
  return (
    <div>
      <h1>Sri Lanka Map</h1>
      <MapComponent />
    </div>
  );
};

export default Map;
