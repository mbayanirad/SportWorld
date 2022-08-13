// Exercise 3.2 - `getAddressPosition`
// ---------------------------------

const opencage = require('opencage-api-client');
require('dotenv').config();

const getPositionFromAddress = (address) => {
  const requestObj = {
    key: process.env.OPENCAGE_API_KEY,
    q: address,
  };
  return opencage
  .geocode(requestObj)
  .then((data) => {
    return (data.results[0].geometry);
  })
  .catch((error) => {
    console.log('error', error.message);
  });


  // return something...
};

module.exports = {getPositionFromAddress};
// const result = getPositionFromAddress(
//   '301 Rue Caisse, Verdun, QC H4G 3M3, Canada'
// ).then((response) => {return response});
// console.log(result)