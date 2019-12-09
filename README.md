# Calculate Salaries Excercise

## The Problem

The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:

|Monday - Friday|Dollar/Hour|
|--------------|-------|
|00:01 - 09:00 | 25 USD|
|09:01 - 18:00 | 15 USD|
|18:01 - 00:00 | 20 USD|

|Saturday and Sunday|Dollar/Hour|
|--------------|-------|
|00:01 - 09:00 | 30 USD|
|09:01 - 18:00 | 20 USD|
|18:01 - 00:00 | 25 USD|

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:

|Code|Day|
|----|---|
|MO| Monday|
|TU| Tuesday|
|WE| Wednesday|
|TH| Thursday|
|FR| Friday|
|SA| Saturday|
|SU| Sunday|

Input: the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our two examples below.

Output: indicate how much the employee has to be paid

For example:

Case 1:

INPUT

RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

OUTPUT:

The amount to pay RENE is: 215 USD

Case 2:

INPUT

ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT:

The amount to pay ASTRID is: 85 USD

## My Solution

My code has the following structure:

__src:__ it has the main program and operations.

- Operations.js: it has a set of functions to calculate the price, make validations and format data, the idea is make pure functions and use first class functions to achive our goal.  

- Index.js: it has the functions to read,format and calculate salary(this function is part of operations.js).

__test:__ it has a set of unit test of main functions to solve the proble like: calculateSalary,checkDay,calculatePricePerDay.
 

__data:__ it has .json file with schedules and their prices
The idea is try to simulate db where we can add or remove sets of data.



## Run environment

First you need install the project dependencies, execute:

```npm install```

To run the project, execute:

```npm start```

To run tests, execute:

```npm test```


