const fs = require('fs');
const { calculateSalary } = require('./operations');

// Functions
const formatSalaries = salary => {
    const partsSalary = salary.split("=");
        return {
            user:partsSalary[0],
            schedule:partsSalary[1]
        }
}

const calculateSalariesOfEmployees = salary => {
    if(!salary.schedule) return `It's an invalid set of data`
    const schedules = salary.schedule.split(",");
    const formatedSchedule = schedules.reduce (
        (total,schedule) => {total[schedule.substring(0,2)] = schedule.substring(2);return total}
        ,new Object);
    
    const calculatedsalary = calculateSalary(formatedSchedule);
    return `The amount to pay ${salary.user} is: ${calculatedsalary}`;

}

// Main Program
const contents = fs.readFileSync('./salaries.txt', 'utf8');
const salaries = contents.split(/\r?\n/)

const formatedSalaries = salaries.map(formatSalaries);
const calculatedSalaries = formatedSalaries.map(calculateSalariesOfEmployees);
calculatedSalaries.map(calculatedSalary => console.log(calculatedSalary));



