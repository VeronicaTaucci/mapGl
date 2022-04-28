import React,{useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import data from './data/data.json';

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 29.7084257,
    longitude: -95.3879466,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);


  return (
    
      <div>
      <ReactMapGL
        {...viewport}
mapboxApiAccessToken = { process.env.REACT_APP_MAPBOX_TOKEN }
mapStyle = "mapbox://styles/veronica1111/cl2jdktxr001514qhnsghaemr"
onViewportChange = { viewport => {
  setViewport(viewport);
}}
      >
{
  data.parks.map(park => (
    <Marker
      key={park.park_id}
      latitude={park.latitude}
      longitude={park.longitude}
    >
      <button
        className='marker-btn'
        onClick={e => {
          e.preventDefault();
          setSelectedPark(park);
        }}
      >
        <img src={park.image} alt="Park Icon"  />
      </button>
    </Marker>
  ))
}

{
  selectedPark ? (
    <Popup
              latitude={selectedPark.park.latitude}
              longitude={selectedPark.park.longitude}
      onClose={() => {
        setSelectedPark(null);
      }}
    >
      <div>
                <h2>{selectedPark.park.park_name}</h2>
                <p>{selectedPark.park.description}</p>
      </div>
    </Popup>
  ) : null
}
      </ReactMapGL >
    </div >
  );
}