const keys = require('./keys');
const request = require('request');

request({
  headers: {'user-key': keys.zomato_user_keys},
  url: 'https://developers.zomato.com/api/v2.1/cities?q=New York City',
  json: true
}, (error, response, body) => {
  //do something

  // let  = JSON.parse(body)
  //console.log(typeof(body));
  console.log(body.location_suggestions[0])
  // let zdata = JSON.parse(body)
  // console.log(zdata)


});

request({
   headers: {'user-key': keys.geo_locator_keys},
   url: 'https://developers.zomato.com/api/v2.1/geocode?lat=40.742051&lon=-74.004821',
   json: true
 }, (error, response, body) => {

   console.log(JSON.stringify(body, undefined, 2));
 });
