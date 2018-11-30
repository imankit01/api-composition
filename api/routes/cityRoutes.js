'use strict';

module.exports = function(app) {
    let city = require('../controllers/cityController')

    app.route('/v1/city')
        .get(city.get_city_info)
}
