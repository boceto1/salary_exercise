const fs = require('fs');

const { calculateSalary } = require('./operations');

const contents = fs.readFileSync('salaries.txt', 'utf8');

const salaries = contents.split(/\r?\n/)

    const formatedSalaries = salaries.map(salary => {
        const partsSalary = salary.split("=");
        return {
            user:partsSalary[0],
            schedule:partsSalary[1]
        }
    })
    
    const calculatedSalaries = formatedSalaries.map( salary => {
            if(!salary.schedule) return `It's an invalid set of data`
            const schedules = salary.schedule.split(",");
            const formatedSchedule = schedules.reduce (
                (total,schedule) => {total[schedule.substring(0,2)] = schedule.substring(2);return total}
                ,new Object);
            
            const calculatedsalary = calculateSalary(formatedSchedule);
            return `The amount to pay ${salary.user} is: ${calculatedsalary}`;

    });
    
calculatedSalaries.map(calculatedSalary => console.log(calculatedSalary));



