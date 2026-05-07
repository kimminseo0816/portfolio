export const geolocationOptions = {
  enableHighAccuracy: false,
  timeout: 1000 * 60 * 2, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
