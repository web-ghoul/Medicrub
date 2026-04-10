import { Box, useMediaQuery } from "@mui/material";
import "@reach/combobox/styles.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import LoadingMap from "../LoadingMap/LoadingMap";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Location({ lat, lng }) {
  if (!lat || !lng) return <LoadingMap />;
  return <Map selected={[lat, lng]} />;
}

function Map({ selected }) {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  return (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
        <MapContainer
          center={selected}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: '100%', height: mdScreen ? (smScreen ? "300px" : "350px") : "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selected} />
        </MapContainer>
    </Box>
  );
}

