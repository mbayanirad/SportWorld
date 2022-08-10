import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import styled from "styled-components";
// import {SkeletonText, Text} from '@chakra-ui/react'
const center = { lat: 45.459316, lng: -73.548542 };
const center2 = { lat: 44.459316, lng: -72.548542 };

const Map = ({ width, height, setDistination = false }) => {
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    
    //auto comletation by vscode
    /** @type React.MutableRe&Object<HTMLInputElement> */
    const originRef = useRef();
    
    /** @type React.MutableRe&Object<HTMLInputElement> */
    const destinationRef = useRef();
    
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDmPfSS2HD8KXuStZRXhsFKXE-EUDvWPSM",
        libraries: ["places"],
    });
    
    const calculateRoute = async (ev) => {
        ev.preventDefault();
        // eslint-disable-next-line no-undef 
        // const pointA = new google.maps.LatLng(51.7519, -1.2578);
        if(originRef.current.value === '' || destinationRef === ''){
            return
        }
        //this line is for disbale not defined google
        // eslint-disable-next-line no-undef 
        const directionService = new google.maps.directionService();

        console.log("line42",directionService);
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: "DRIVING"
      });
      setDirectionResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      
    }
    //check for loading map
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Container width={width} height={height}>
      {setDistination && (
        <NavBar>
          <From onSubmit={(ev)=> calculateRoute(ev)}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef}/>
            </Autocomplete>
            <Autocomplete>
              <Input type="text" placeholder="Destination" ref={destinationRef} />
            </Autocomplete>
            <CalculateBtn type="submit" value="Calculate Route"  />
          </From>
        </NavBar>
      )}

      <MapBox>
        {/* google map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ height: "100%", width: "100%" }}
        >
          {/* Displayin markers, or directions */}
          <Marker position={center} />
          <Marker position={center2} />
        </GoogleMap>
      </MapBox>
    </Container>
  );
};
const Container = styled.div`
  margin: 20px;
  min-width: 400px;
  height: ${(measure) => measure.height}px;
  width: ${(measure) => measure.width}px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const NavBar = styled.div`
  background-color: white;
`;

const From = styled.form`
  display: flex;
  justify-content: center;
  /* justify-items: center; */
  align-content: center;
  text-align: center;
  align-items: center;
  padding: 10px;
`;
const Input = styled.input`
  width: auto;
  height: 20px;
  margin: 0 4px;
`;

const CalculateBtn = styled(Input)`
  color: white;
  border: none;
  /* width: 150px; */
  height: 30px;
  border-radius: 5px;
  margin: 10px 0;
  background: #15be89;
`;
const MapBox = styled.div`
  padding: 0 5px;
  height: 100%;
  width: 100%;
`;
export default Map;
