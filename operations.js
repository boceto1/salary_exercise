const pricesJson = require("./prices.json");


const calculateSalary = (schedule) => {
    try{
        const days = Object.keys(schedule);
    
        const salary = days.reduce((totalPrice,day)=>{
            const typeDay = checkDay(day);
            const formatedSchedule = formatSchedule(schedule[day]);
            const price = calculatePricePerDay({typeDay,
                startHour:formatedSchedule.startHour,
                endHour:formatedSchedule.endHour});
            return totalPrice + price; 
        },0)
    
        return salary;
    }catch(error){
        console.error(`Error with ${Object.keys(schedule)} --- ${Object.values(schedule)} data`,`The error was ${error.message}`);
        return -1;
    }
};

const checkDay = (day) => {
    if(day.match(/MO|TU|WE|TH|FR/s)) return "weekday";
    if(day.match(/SA|SU/s)) return "weekend";
    
    throw new Error('Invalid day');
};

const calculatePricePerDay =  ({typeDay,startHour,endHour}) => {

    const prices = pricesJson[typeDay];
    let total =0,result=0;

    if(!prices) return null;

    const schedules = Object.keys(prices);
    const formatedSchedules = schedules.map(formatSchedule);

    do{
            startHour.setHours(startHour.getHours()+1);    
            result = calculatePrice({hour:startHour,schedules:formatedSchedules,prices});
            total+= result;
    }while(startHour.getTime()<endHour.getTime())

    return total;
};

const calculatePrice = ({hour,schedules,prices}) => {
        let price = 0;
        
        for (let scheduleIndex = 0; scheduleIndex < schedules.length; scheduleIndex++) {
            const schedule = schedules[scheduleIndex];
            if(hour.getTime()>schedule.startHour.getTime() && hour.getTime()<=schedule.endHour.getTime()){
                return prices[schedule.originalFormat];
            }  
        }
        return price;
}


formatSchedule = (schedule) => {
    let endHour;
    const hours = schedule.split("-").map(hour=>hour.split(":"));

    if(!checkHour(hours[0][0],hours[0][1]) || !checkHour(hours[1][0],hours[1][1])) throw new Error('Invalid format hour')
    
    const startHour = new Date(0,0,0,hours[0][0],hours[0][1]);
     
    (hours[1][0] === "00" && hours[1][1] === "00") ?
          endHour= new Date(0,0,1,hours[1][0],hours[1][1])
        : endHour = new Date(0,0,0,hours[1][0],hours[1][1]);

    if(startHour.getTime() > endHour.getTime()) throw new Error('EndHour is before to start hour');
    
    return {
        originalFormat: `${hours[0][0]}:${hours[0][1]}-${hours[1][0]}:${hours[1][1]}`,
        startHour,
        endHour
        };
}

checkHour = (hour,minutes) => ((hour>=0 && hour<=23) && ((minutes>=0) && (minutes<=59))) ? true : false;

module.exports = {
    calculateSalary,
    checkDay,
    calculatePricePerDay
}