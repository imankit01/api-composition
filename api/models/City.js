let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CitySchema = new Schema({
    city_id: {
        type: Number,
        required: true
    },
    city_name: String,

    restaurants: Array,

    geo_code: {
        lon:  {type: Number, required: true},
        lat:  {type: Number, required: true}
    },
    city_weather: {
        climateInfo: {type: Object, required: true}
    },

});

module.exports = mongoose.model('City', CitySchema);
