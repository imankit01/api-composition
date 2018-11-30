let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let mongoose = require('mongoose');

// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/CityInfoDB', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);

let routes = require('./api/routes/cityRoutes');
routes(app);

console.log(`MyApp RESTful API server started on port: ${port}`);
