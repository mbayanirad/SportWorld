import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import {SkeletonText, Text} from '@chakra-ui/react'
// const center2 = { lat: 44.459316, lng: -72.548542 };

const Map = ({ width, height, setDirection = false, eventInfo }) => {
  const [directionResponse, setDirectionResponse] = useState(null);

  const [travelMode, setTravelMode] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const center = { ...eventInfo.startpoint.geo };
  // { lat: 44.459316, lng: -72.548542 }
  // for set origin and destinatiion point with event information
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [mapSelection, setMapSelection] = useState(null);
  useEffect(() => {
    console.log("map useefect", mapSelection);
    if (eventInfo !== "") {
      setDestination(eventInfo.startpoint.address);
      // destinationRef.current.value = eventInfo.startpoint.address;
      // setMapSelection(eventInfo.startpoint.address)
    } else {
      // setOrigin()
    }

    return () => {
      setOrigin("");
      setDestination("");
    };
  }, [mapSelection]);
  //auto comletation by vscode
  /** @type React.MutableRe&Object<HTMLInputElement> */
  const originRef = useRef();

  /** @type React.MutableRe&Object<HTMLInputElement> */
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const calculateRoute = async (ev) => {
    ev.preventDefault();
    console.log("check points");
    console.log(originRef.current.value);

    console.log(destinationRef.current.value);
    // eslint-disable-next-line no-undef
    // const pointA = new google.maps.LatLng(51.7519, -1.2578);
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    //this line is for disbale not defined google
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();

    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: travelMode || "BICYCLING",
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };
  //check for loading map
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Container width={width} height={height}>
      {setDirection && (
        <NavBar>
          <From onSubmit={(ev) => calculateRoute(ev)}>
            <Body>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Origin"
                  ref={originRef}
                  value={origin}
                  onChange={(ev) => setOrigin(ev.target.value)}
                />
              </Autocomplete>
              <Autocomplete>
                <Input
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                  value={destination}
                  onChange={(ev) => setDestination(ev.target.value)}
                />
              </Autocomplete>
              <CalculateBtn type="submit" value="Calculate Route" />
              <div style={{ margin: "15px" }}>
                <Selection
                  key="path"
                  value={mapSelection}
                  onChange={(ev) => setMapSelection(ev.target.value)}
                >
                  <option value={"Start point"} key="point">
                    Start point
                  </option>
                  <option value={"Training Path"} key="path">
                    Training Path
                  </option>
                </Selection>
                <Selection
                  key="path"
                  value={mapSelection}
                  onChange={(ev) => setTravelMode(ev.target.value)}
                >
                  <option value={"BICYCLING"} key="bike">
                    BICYCLING{" "}
                  </option>
                  <option value={"WALKING"} key="walk">
                    WALKING{" "}
                  </option>
                  <option value={"TRANSIT"} key="tran">
                    TRANSIT{" "}
                  </option>
                  <option value={"DRIVING"} key="driv">
                    DRIVING{" "}
                  </option>
                </Selection>
              </div>
            </Body>
            <Result>
              <div>
                distance:{distance},     duration: {duration}
              </div>
            </Result>
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
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
          {/* <Marker position={center2} /> */}
        </GoogleMap>
      </MapBox>
    </Container>
  );
};
const Container = styled.div`
  margin: 5px 20px;
  min-width: 400px;
  height: ${(measure) => measure.height}px;
  width: ${(measure) => measure.width}px;
  max-width: 98%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const NavBar = styled.div`
  background-color: white;
`;
const Result = styled.div`
  margin-bottom: 15px;
  margin-right: 20px;
`;

const From = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  z-index: 11;
  background: white;
  width: 40%;
  height: 17%;
  right: 30%;
  top: 2%;
  border-radius: 5px;
  padding: 5px;
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  align-items: center;
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
const Selection = styled.select`
  margin: 4px;
`;
export default Map;
