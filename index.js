const pricesJson = require("./prices.json");

const calculateSalary = (schedule) => {


    return 215;
}

const checkDay = (day) => {
    if(day.match(/MO|TU|WE|TH|FR/s)) return "weekday";
    if(day.match(/SA|SU/s)) return "weekend";
    return null;
};

const calculatePricePerDay = ({typeDay,startHour,endHour}) => {

    const prices = pricesJson[typeDay];
    let total =0;

    if(!prices) return null;

    schedules = Object.keys(prices);
    const formatedSchedules = schedules.map(formatSchedule);

    for(i=0;i<formatedSchedules.length;i++){
        
    }

    console.log(formatedSchedules);

    return prices;
};

formatSchedule = (schedule) => {
    const hours = schedule.split("-");
    return {startHour: hours[0],endHour: hours[1]}
}

module.exports = {
    calculateSalary,
    checkDay,
    calculatePricePerDay
}