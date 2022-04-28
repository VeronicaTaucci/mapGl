import React,{useState} from 'react';
import ReactMapGl from 'react-map-gl';


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 40.741895,
    longitude: -73.989308,
    weight: "100vw",
    height: "100vh",
    zoom: 10,
  });
  return (
    
      <>
      <ReactMapGl {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} >
        markers here
      </ReactMapGl>
      </>
  );
}


