var _ = require('lodash');

export const filterData = async (data, filter) => {  
    var filteredData = _.chain(data).groupBy(filter)
                       .map((value, key) => ({ project: key, employees: mapEmployeeToObject(value) }))
                       .value()
                       .map(mappedValue => {
                            let employees = {
                                employeeIDs: [],
                                projectID: mappedValue.project,
                                daysWorked: null
                            };
                            for(let i = 0; i < mappedValue.employees.length; i++){
                                employees.employeeIDs.push(mappedValue.employees[i].employeeID);                             
                                employees.daysWorked = parseDates(mappedValue.employees[i].fromDate, mappedValue.employees[i].toDate);                               
                            }
                            console.log(employees.daysWorked);
                            return employees;
                       });
    
    //console.log(filteredData);
    return filteredData;
};

const parseDates = (fromDate, toDate) => {
    let fromDateParsed = new Date(fromDate);
    let toDateParsed = new Date(toDate === 'NULL' ? new Date() : toDate);

    let difference = fromDateParsed.getTime() - toDateParsed.getTime();
    console.log(fromDateParsed, toDateParsed);
    return Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
};

const mapEmployeeToObject = (emp) => {
    return emp.map(e => {
        return ({
            employeeID: e[0],
            projectID: e[1],
            fromDate: e[2],
            toDate: e[3]
        })
    });
};