import { LocationOnRounded } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { handleAlert } from "../../functions/handleAlert";
import LoadingMap from "../LoadingMap/LoadingMap";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to update map view
function MapViewUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

// Helper component to handle map clicks
function MapEvents({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function SelectLocation({ formik, label }) {
  const [isLoaded, setIsLoaded] = useState(true); // Leaflet doesn't need a loader like Google Maps

  if (!isLoaded) return <LoadingMap />;
  return <Map formik={formik} label={label} />;
}

function Map({ formik, label }) {
  const [selected, setSelected] = useState(() => formik.address ? { lat: formik.latitude, lng: formik.longitude } : null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false)
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [visible, setVisible] = useState(false)

  const [searchValue, setSearchValue] = useState(formik.address || "");
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState("IDLE");

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setStatus("LOADING");
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
      const data = await response.json();
      setSuggestions(data);
      setStatus("OK");
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setStatus("ERROR");
    }
  };

  const determineLocation = async () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          formik.latitude = latitude
          formik.longitude = longitude
          
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const address = data.display_name;
            formik.address = address
            setSearchValue(address)
            setSelected({ lat: latitude, lng: longitude });
          } catch (error) {
            console.error('Error fetching address:', error);
          }
          setLoading(false)
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false)
        }
      );
    } else {
      handleAlert({ msg: 'Geolocation is not supported by this browser.', status: "error" })
    }
  };

  const handleMapClick = async (latlng) => {
    const { lat, lng } = latlng;
    setSelected({ lat, lng });
    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name;
      formik.address = address;
      setSearchValue(address);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selected) {
      formik.latitude = selected.lat
      formik.longitude = selected.lng
    }
  }, [selected, formik])

  useEffect(() => {
    if (selected) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [selected])

  return (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
      <Box className="grid justify-stretch items-start gap-2 md:gap-1" sx={{ gridTemplateColumns: "1fr auto" }}>
        <Box className={"grid justify-stretch items-center gap-1"}>
          <PlacesAutocomplete 
            value={searchValue}
            setValue={setSearchValue}
            status={status}
            data={suggestions}
            label={label}
            fetchSuggestions={fetchSuggestions}
            setAddress={setAddress} 
            setSelected={setSelected}
            formik={formik}
          />
        </Box>
        {loading ? <Box className="p-2"><CircularProgress size={24} /></Box> : <Tooltip title={"Determine Your Location"}>
          <IconButton onClick={determineLocation} variant="contained" className='w-fit' color="primary">
            <LocationOnRounded className="!text-[32px] lg:!text-[30px] md:!text-[28px]" />
          </IconButton>
        </Tooltip>}
      </Box>

      {selected && (
        <MapContainer
          center={[selected.lat, selected.lng]}
          zoom={18}
          scrollWheelZoom={false}
          style={{ width: '100%', height: mdScreen ? (smScreen ? "300px" : "350px") : "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewUpdater center={[selected.lat, selected.lng]} />
          <MapEvents onMapClick={handleMapClick} />
          {visible && <Marker position={[selected.lat, selected.lng]} />}
        </MapContainer>
      )}
    </Box>
  );
}

const PlacesAutocomplete = ({ 
  value,
  setValue,
  status, 
  data,
  setAddress, 
  setSelected, 
  label,
  fetchSuggestions,
  formik
}) => {

  const handleSelect = async (address) => {
    setValue(address);
    const selectedPlace = data.find(item => item.display_name === address);
    if (selectedPlace) {
      const lat = parseFloat(selectedPlace.lat);
      const lng = parseFloat(selectedPlace.lon);
      setSelected({ lat, lng });
      formik.address = address;
      formik.latitude = lat;
      formik.longitude = lng;
    }
  };

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val);
    fetchSuggestions(val);
    if (val === "") {
      setSelected(null)
      formik.address = "";
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={handleChange}
        className="p-4 w-[100%] rounded-md md:p-3 sm:!p-2 border border-gray-300"
        placeholder={label}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map((item, index) => (
              <ComboboxOption key={index} value={item.display_name} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
