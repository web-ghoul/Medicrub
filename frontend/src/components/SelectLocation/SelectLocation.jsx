import { LocationOnRounded } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { handleAlert } from "../../functions/handleAlert";

export default function SelectLocation({ formik, label }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries: ['places'],
  });
  if (!isLoaded) return <Typography variant="h6">Loading...</Typography>;
  return <Map formik={formik} label={label} />;
}

function Map({ formik, label }) {
  const [selected, setSelected] = useState(() => formik.address ? { lat: formik.latitude, lng: formik.longitude } : null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false)
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const {
    ready,
    value,
    setValue,
    suggestions,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const determineLocation = async () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          formik.latitude = latitude
          formik.longitude = longitude
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`;
          await fetch(url)
            .then(response => response.json())
            .then(data => {
              const address = data.results[0].formatted_address;
              formik.address = address
            })
            .catch(error => {
              console.error('Error fetching address:', error);
            });
          setSelected({ lat: latitude, lng: longitude });
          setValue(formik.address, false)
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

  useEffect(() => {
    if (selected) {
      formik.latitude = selected.lat
      formik.longitude = selected.lng
      if (address) {
        formik.address = address
      }
    }
  }, [selected, formik, address])

  useEffect(() => {
    if (formik.address) {
      setValue(formik.address, false)
    }
  }, [formik, setValue])

  return (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
      <Box className="grid justify-stretch items-start gap-2 md:gap-1" sx={{ gridTemplateColumns: "1fr auto" }}>
        <Box className={"grid justify-stretch items-center gap-1"}>
          {/* <Typography variant="h6">{label}</Typography> */}
          <PlacesAutocomplete ready={ready}
            value={value}
            setValue={setValue}
            status={suggestions.status}
            data={suggestions.data}
            label={label}
            clearSuggestions={clearSuggestions} setAddress={setAddress} setSelected={setSelected} />
        </Box>
        {loading ? <CircularProgress /> : <Tooltip title={"Determine Your Location"}>
          <IconButton onClick={determineLocation} variant="contained" className='w-fit' color="primary">
            <LocationOnRounded className="!text-[32px] lg:!text-[30px] md:!text-[28px]" />
          </IconButton>
        </Tooltip>}
      </Box>

      <GoogleMap
        id="map"
        center={selected}
        zoom={selected ? 18 : 2}
        mapContainerStyle={{ width: '100%', height: selected ? mdScreen ? smScreen ? "300px" : "350px" : "400px" : "0px" }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </Box>
  );
}

const PlacesAutocomplete = ({ ready,
  value,
  setValue,
  status, data,
  clearSuggestions, setAddress, setSelected, label }) => {

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    setAddress(address)
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const handleChange = (e) => {
    const val = e.target.value
    setValue(val);
    if (val === "") {
      setAddress("")
      setSelected(null)
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={handleChange}
        disabled={!ready}
        className="p-4 w-[100%] rounded-md md:p-3 sm:!p-2"
        placeholder={label}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};