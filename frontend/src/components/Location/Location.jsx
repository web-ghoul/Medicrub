import { Box, useMediaQuery } from "@mui/material";
import "@reach/combobox/styles.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import LoadingMap from "../LoadingMap/LoadingMap";

export default function Location({ lat, lng }) {
  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries,
    loading: "async"
  });

  if (!isLoaded) return <LoadingMap />;
  return <Map selected={{ lat, lng }} />;
}

function Map({ selected }) {
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [visible])

  return (
    <Box className={`grid justify-stretch items-center gap-4 md:!gap-2`}>
      <GoogleMap
        id="map"
        center={selected}
        zoom={selected ? 18 : 2}
        mapContainerStyle={{ width: '100%', height: selected ? mdScreen ? smScreen ? "300px" : "350px" : "400px" : "0px" }}
      >
        {visible && <Marker position={selected} />}
      </GoogleMap>
    </Box>
  );
}
