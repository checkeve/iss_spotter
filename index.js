// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log("It worked! Returned IP:" , ip);
// });

fetchCoordsByIP("5", (error, data) => {
  if (error) {
    console.log(`It didn't work! Error: Success status was ${data.success}. Server message says: ${data.message}`);
    return;
  }
  console.log(data);
});