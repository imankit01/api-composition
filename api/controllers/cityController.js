'use strict';
let request = require('request')
let City = require('../models/City');

let keys = require('../../config/keys')
const async = require('async')


exports.get_city_info = function(req, res) {
    console.log('RRRRR')
    let city = req.query.name;

    if(city) {

        async.waterfall([
         function (done) {
            request({
                headers: {'user-key': keys.zomato_user_key},
                uri: `https://developers.zomato.com/api/v2.1/cities?q=${city}`
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let cityData = JSON.parse(body);
                    done(null, cityData)
                } else {
                    error = "Error fetching data"
                    done(error, cityData, null)
                }
            });
            },
            function(cityData, done) {
                console.log(cityData.location_suggestions[0])
                let city_id = cityData.location_suggestions[0].id;
                done(null, city_id)
            },
            function(city_id, done) {
                request({
                    headers: {'user-key': keys.zomato_user_key},
                    uri: `https://developers.zomato.com/api/v2.1/collections?city_id=${city_id}`
                }, (error, response, body) => {
                    let restu_list = JSON.parse(body);
                    let final_restu_list = [];
                    for(let restu of restu_list.collections) {
                        let restu_obj = {
                            title:         restu.collection.title,
                            image_url:     restu.collection.image_url,
                            description:   restu.collection.description,
                            detailed_link: restu.collection.share_url
                        };
                        // console.log(restu.collection)
                        final_restu_list.push(restu_obj)
                    }
                    console.log(final_restu_list);
                    done(null, final_restu_list, city_id)
                });

            },
            function(final_restu_list, city_id, done) {
                request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&apiKey=${keys.weather_api_key}`, (error, response, body) => {

                if(!error && response.statusCode === 200) {
                    let weather = JSON.parse(body);
                    // console.log("Weather:", weather)
                    console.log(weather)
                    done(null, final_restu_list, city_id, weather)
                } else {
                    error = "Error fetching data"
                    done(error, final_restu_list, city_id, weather)
                }
                });
            },
            function(final_restu_list, city_id, weather) {

                let geo_code = {
                    lon: weather.coord.lon,
                    lat: weather.coord.lat
                }

                let newCity = new City({
                    city_id: city_id,
                    city_name: weather.name,
                    geo_code: geo_code,
                    city_weather: {
                        climateInfo: weather.main
                    },
                    restaurants: final_restu_list
                });

                // newCity.save((err, city) => {
                //     if(err) res.send(err);
                //     res.json(city)

                // })

                res.send(newCity)
            }
        ]);


    } else {
        return res.status(400).send({
            msg: 'Enter City name in Query Parameter',
            status: 400
        })
    }

};
