import { Box, Typography, useMediaQuery } from "@mui/material";
import "@reach/combobox/styles.css";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import carImage from "../../assets/images/car.png";
import LoadingMap from "../LoadingMap/LoadingMap";

const carIcon = L.icon({
  iconUrl: carImage,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Helper component to fit bounds
function SetBounds({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
}

export default function DriversLocation() {
  const { drivers, isLoading } = useSelector((state) => state.drivers)

  if (isLoading) return <LoadingMap />;
  const locations = drivers && drivers.map((driver) => ({ lat: +driver.location.latitude, lng: +driver.location.longitude }));
  
  return <Map locations={locations} drivers={drivers} />;
}

function Map({ locations, drivers }) {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  return locations && (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
      <MapContainer
        center={locations.length > 0 ? [locations[0].lat, locations[0].lng] : [0, 0]}
        zoom={locations.length > 0 ? 10 : 2}
        style={{ width: '100%', height: locations.length > 0 ? (mdScreen ? (smScreen ? "300px" : "350px") : "400px") : "0px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetBounds locations={locations} />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={carIcon}
          >
            <Popup>
              <Box className={"grid justify-stretch items-center gap-2 py-2 pb-4"}>
                <Box 
                  className={"w-[80px] h-[80px] rounded-full overflow-hidden bg-center bg-cover bg-no-repeat m-auto"} 
                  sx={{ backgroundImage: `url(${drivers[index].user.profileImage})` }}
                >
                </Box>
                <Typography variant="subtitle2" className="font-[600]">
                  {`${drivers[index].user.firstName} ${drivers[index].user.lastName}`}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

