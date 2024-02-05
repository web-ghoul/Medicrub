import { LocationOnRounded } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
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

export default function SelectPosition({ formik }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map formik={formik} />;
}

function Map({ formik }) {
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState(null);
  const {
    ready,
    value,
    setValue,
    suggestions,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const determineLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          formik.values.latitude = latitude
          formik.values.longitude = longitude
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              const address = data.results[0].formatted_address;
              setValue(address, false)
              formik.values.address = address
            })
            .catch(error => {
              console.error('Error fetching address:', error);
            });
          setSelected({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      handleAlert({ msg: 'Geolocation is not supported by this browser.', status: "error" })
    }
  };

  useEffect(() => {
    if (selected) {
      formik.values.latitude = selected.lat
      formik.values.longitude = selected.lng
      formik.values.address = address
    }
  }, [selected, formik, address])

  return (
    <>
      <Box className="grid justify-stretch items-center gap-2" sx={{ gridTemplateColumns: "1fr auto" }}>
        <PlacesAutocomplete ready={ready}
          value={value}
          setValue={setValue}
          status={suggestions.status}
          data={suggestions.data}
          clearSuggestions={clearSuggestions} setAddress={setAddress} setSelected={setSelected} />
        <Tooltip title={"Determine Your Location"}>
          <IconButton onClick={determineLocation} variant="contained" className='w-fit' color="primary">
            <LocationOnRounded sx={{ fontSize: { lg: "30px", md: "26px", sm: "22px" } }} />
          </IconButton>
        </Tooltip>
      </Box>

      <GoogleMap
        id="map"
        center={selected}
        zoom={selected ? 18 : 2}
        mapContainerStyle={{ width: '100%', height: selected ? "400px" : "0px" }}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ ready,
  value,
  setValue,
  status, data,
  clearSuggestions, setAddress, setSelected }) => {

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    setAddress(address)
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="px-4 py-4 w-[100%] rounded-md "
        placeholder="Search an address"
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