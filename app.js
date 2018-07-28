const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address for weather information'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const googleURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCM7Dt1ZYTMdDmWI3lxnrQB5qvhTNNMrww&address=${encodeURIComponent(argv.address)}`;
const weatherURL = `https://api.darksky.net/forecast/f49218caa0b2b52d14dfa45e0bca4302/`;

axios.get(googleURL)
  .then((data) => {
    console.log(data.data.results[0].formatted_address);
    return axios.get(`${weatherURL}${data.data.results[0].geometry.location.lat},${data.data.results[0].geometry.location.lng}`)
  })
  .then((data) => {
    console.log(`The temperature is ${data.data.currently.temperature}, and it feels like ${data.data.currently.apparentTemperature}.`);
  })
  .catch((err) => {
    console.log(err);
  });
