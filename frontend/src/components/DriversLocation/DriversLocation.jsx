import { Box, Typography, useMediaQuery } from "@mui/material";
import "@reach/combobox/styles.css";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import carImage from "../../assets/images/car.png";
import LoadingMap from "../LoadingMap/LoadingMap";

export default function DriversLocation() {
  const { drivers, isLoading } = useSelector((state) => state.drivers)
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries,
    loading: "async"
  });

  if (!isLoaded || isLoading) return <LoadingMap />;
  return <Map locations={drivers && drivers.map((driver) => ({ lat: +driver.location.latitude, lng: +driver.location.longitude }))
  } />;
}

function Map({ locations }) {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [visible, setVisible] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [driverIndex, setDriverIndex] = useState(null);
  const { drivers } = useSelector((state) => state.drivers)
  const mapRef = useRef(null);
  const [map, setMap] = useState(null)

  const handleMarkerClick = (marker, index) => {
    setSelectedMarker(marker);
    setDriverIndex(index)
  };

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    drivers.forEach((driver) => {
      bounds.extend({
        lat: +driver.location.latitude,
        lng: +driver.location.longitude
      });
    });
    map.fitBounds(bounds);
    setMap(map)
  }, [drivers])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(() => {
    if (locations) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [visible, locations])

  useEffect(() => {
    if (map) {
      onLoad(map)
    }
  }, [onLoad, drivers, map])

  return locations && (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
      <GoogleMap
        id="map"
        ref={mapRef}
        center={map ? { lat: map.center.lat(), lng: map.center.lng() } : locations.length > 0 ? locations[0] : { lat: 0, lng: 0 }}
        zoom={map ? map.zoom : locations.length > 0 ? 10 : 2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapContainerStyle={{ width: '100%', height: locations.length > 0 ? (mdScreen ? (smScreen ? "300px" : "350px") : "400px") : "0px" }}
      >
        {visible && locations.map((location, index) => (
          <Marker
            key={index}
            position={location}
            icon={{
              url: carImage,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
            onClick={() => handleMarkerClick(location, index)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <Box className={"grid justify-stretch items-center gap-2 py-2 pb-4"}>
              <Box className={"w-[80px] h-[80px] rounded-full overflow-hidden bg-center bg-cover bg-no-repeat m-auto"} sx={{ backgroundImage: `url(${drivers[driverIndex].user.profileImage})` }}>
              </Box>
              <Typography variant="subtitle2" className="font-[600]">{`${drivers[driverIndex].user.firstName} ${drivers[driverIndex].user.lastName}`}</Typography>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </Box>
  );
}
