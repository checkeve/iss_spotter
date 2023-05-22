// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

//**code to call fetchMyIP**// (result is IP: 75.156.15.43)
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log("It worked! Returned IP:" , ip);
// });

// **code to call fetchCoordsByIP **// (result is { latitude: 48.4284207, longitude: -123.3656444 })
// fetchCoordsByIP("75.156.15.43", (error, data) => {
//   if (error) {
//     console.log(`It didn't work! Error: Success status was ${data.success}. Server message says: ${data.message}`);
//     return;
//   }
//   console.log(data);
// });

// **code to call fetchCoordsByIP **//
fetchISSFlyOverTimes({ latitude: 48.4284207, longitude: -123.3656444 }, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(data);
}
);