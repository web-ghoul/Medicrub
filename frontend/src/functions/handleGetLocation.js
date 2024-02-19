import axios from "axios";
import { handleAlert } from "./handleAlert";

export const handleGetLocation = async(address)=>{
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAP_API}`; 
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const loc = await axios.get(geocodeUrl)
    .then(data => {
      if (data.data.status === 'OK') {
        const location = data.data.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;
        return {lat:latitude , lng:longitude , address} 
      } else {
        handleAlert({msg:"Geocoding API request failed",status:"error"})
      }
    })
    .catch(error => {
      handleAlert({msg:"Error fetching data",status:"error"})
    });
  return loc
}