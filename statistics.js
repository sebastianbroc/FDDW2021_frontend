const fs = require('fs');

const getDayStats = (path, date) => {
    let dateobject = date;
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    let lowesttemp = 100;
    let highesttemp = -100;

    let selectedentrys = [];

    array.forEach(element => { //put all entries from selected day in new array
        if(element.day == dateobject.day && element.month == dateobject.month && element.year == dateobject.year){
            selectedentrys.push(element);
        }
    })


    let temperaturesum = 0;
    let entrycount = 0;
    selectedentrys.forEach(element => { //calculate average temperature, highest and lowest in a day.
        temperaturesum += parseInt(element.temperature);
        if(element.temperature < lowesttemp){lowesttemp = element.temperature}
        if(element.temperature > highesttemp){highesttemp = element.temperature}
        entrycount++;
    })

    let response = {}
    response.averagetemperature = parseInt(temperaturesum / entrycount);
    response.lowesttemp = lowesttemp;
    response.highesttemp = highesttemp;

    return JSON.stringify(response);
}

const weekdaytotext = (day) => {
    switch(day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
    }
}

const getLastWeek = (path) => {
    let array = JSON.parse(fs.readFileSync(path,'utf8'));
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0'); //current day
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
    var yyyy = today.getFullYear();
    var weekday = today.getDay();

    let todayobject = {
        "day": (dd * 1).toString(),
        "month": (mm * 1).toString(),
        "year": yyyy.toString(),
        "weekday": weekdaytotext(weekday),
        "minute": 0,
        "hout": 0
    }

    let response = [];

    for(let i = 0; i < 7; i++){
        response.push(JSON.parse(getDayStats(path, todayobject)));
        response[i].day = parseInt(todayobject.day);
        response[i].weekday = weekdaytotext(weekday);
        todayobject.day--;
        todayobject.weekday = weekdaytotext(weekday);
        if(weekday == 0){
            weekday = 6;
        } else {
            weekday--;
        }
    }
    return JSON.stringify(response);
}


module.exports.getDayStats = getDayStats;
module.exports.getLastWeek = getLastWeek;