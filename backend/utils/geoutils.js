const EARTH_RADIUS_KM = 6371; // Radius of the Earth in kilometers
const EARTH_RADIUS_MI = 3958.8; // Radius of the Earth in miles

/**
 * Converts degrees to radians.
 * @param {number} degrees - The value in degrees.
 * @returns {number} - The value in radians.
 */
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param {number} lat1 - Latitude of the first point.
 * @param {number} lon1 - Longitude of the first point.
 * @param {number} lat2 - Latitude of the second point.
 * @param {number} lon2 - Longitude of the second point.
 * @param {boolean} [isMiles=false] - Whether to return the distance in miles (default is kilometers).
 * @returns {number} - Distance between the two points in the specified unit (km or miles).
 */
function haversineDistance(lat1, lon1, lat2, lon2, isMiles = false) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.sin(dLon / 2) ** 2 * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return isMiles ? EARTH_RADIUS_MI * c : EARTH_RADIUS_KM * c;
}

/**
 * Validates latitude and longitude values.
 * @param {number} latitude - Latitude to validate.
 * @param {number} longitude - Longitude to validate.
 * @returns {boolean} - True if the coordinates are valid, false otherwise.
 */
function isValidCoordinate(latitude, longitude) {
  return (
    typeof latitude === 'number' && typeof longitude === 'number' &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
}

/**
 * Calculates a bounding box around a geographical point.
 * Useful for querying businesses within a certain distance.
 * @param {number} latitude - Latitude of the center point.
 * @param {number} longitude - Longitude of the center point.
 * @param {number} distance - Distance in kilometers.
 * @returns {Object} - The bounding box with min and max latitudes and longitudes.
 */
function calculateBoundingBox(latitude, longitude, distance) {
  const latChange = distance / EARTH_RADIUS_KM * (180 / Math.PI);
  const lonChange = distance / (EARTH_RADIUS_KM * Math.cos(latitude * Math.PI / 180)) * (180 / Math.PI);

  return {
    minLat: latitude - latChange,
    maxLat: latitude + latChange,
    minLon: longitude - lonChange,
    maxLon: longitude + lonChange
  };
}

module.exports = {
  haversineDistance,
  isValidCoordinate,
  calculateBoundingBox
};
