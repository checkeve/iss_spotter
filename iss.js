/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = 'Status Code ${response.statusCode} when fetching IP. Response: ${body}';
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      callback(null, data.ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) => {
    const data = JSON.parse(body);
    if (!data.success) {
      callback(true, data);
    } else {
      const coords = {latitude : data.latitude, longitude : data.longitude};
      callback(null, coords);
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    if (data.message === "success") {
      const response = data.response;
      callback(null, response);
    }
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
