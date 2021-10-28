const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors")

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "welcome" : "This is a backend starter api based on an express api connected to mongodb, on the OpenShift container platform"
    });
});

require('./app/routes/template.routes.js')(app);

app.enable('trust proxy');

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});