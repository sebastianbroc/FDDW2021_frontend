const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParser = require("body-parser");
const validator = require('./data_validation.js');
const stats = require('./statistics')

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/getcurrent', (req, res) => {
    res.send(validator.getLatestData('weatherdb.json'));
})
app.get('/getplace', (req, res) => {
    res.send(validator.getPlace('weatherdb.json'));
})
app.get('/getstations', (req, res) => {
    res.send(validator.getAllStations('weatherdb.json'));
})
app.get('/getdate', (req, res) => {
    res.send(validator.getDate('weatherdb.json'));
})
app.get('/getstats', (req, res) => {
    let date = {'day':'19','month':'8','year':'121','hour':'0','minute':'0'}
    res.send(stats.getDayStats('weatherdb.json', date));
})
app.get('/getweek', (req, res) => {
    res.send(stats.getLastWeek('weatherdb.json'));
})
app.post('/weather', (req, res) => {
    
    
    validator.addObject('weatherdb.json', req.body.temperature, req.body.humidity, req.body.pressure, req.body.place, req.body.day, req.body.month, req.body.year, req.body.hour, req.body.minute, (err, res) => {

    });
    
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})