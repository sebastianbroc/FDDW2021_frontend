const fs = require('fs');

//TODO: daten wirklich validieren
const addObject = (path, temperature, humidity, pressure, place, day, month, year, hour, minute, callback) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8',callback));

    let newentry = {};
    newentry.temperature = temperature;
    newentry.humidity = humidity;
    newentry.pressure = pressure;
    newentry.place = place;
    newentry.day = day;
    newentry.month = month;
    newentry.year = year;
    newentry.hour = hour;
    newentry.minute = minute;

    array.push(newentry);

    array = JSON.stringify(array);
    fs.writeFileSync(path,array);
    return callback(null, "new data entry was added!");
}

const getLatestData = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));

    let response = {}
    response.temperature = array[array.length-1].temperature;
    response.humidity = array[array.length-1].humidity;
    response.pressure = parseInt(array[array.length-1].pressure);
    return (JSON.stringify(response));
}

const getPlace = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    return (array[array.length-1].place);
}

const getDate = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));

    let date = {}
    date.day = array[array.length-1].day;
    date.month = array[array.length-1].month;
    date.year = array[array.length-1].year;
    date.hour = array[array.length-1].hour;
    date.minute = array[array.length-1].minute;

    return (JSON.stringify(date));
}


module.exports.addObject = addObject;
module.exports.getLatestData = getLatestData;
module.exports.getPlace = getPlace;
module.exports.getDate = getDate;