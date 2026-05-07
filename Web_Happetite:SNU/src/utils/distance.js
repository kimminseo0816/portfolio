import { getDistance } from "geolib";

const checkDistance = ({ lat1, lon1, lat2, lon2 }) => {
  const distance = getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );
  console.log("checkDistance: ", distance);
  return distance;
};

export { checkDistance };
