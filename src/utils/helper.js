import _ from 'lodash';
import moment from 'moment';
import config from '../conf';

export const filterData = async (data, filter, rowsToSelect) => {
    return new Promise((resolve, reject) => {
        try{
            let filteredData = _.chain(data).groupBy(filter)
                                .map((value, key) => ({ project: key, employees: mapEmployeeToObject(value) }))                              
                                .map(mappedValue => {
                                    let employees = {
                                        employeeIDs: [],
                                        projectID: mappedValue.project,
                                        daysWorked: 0
                                    };
                                    let previousEmployeeDays = employees.daysWorked;
                                    for(let i = 0; i < mappedValue.employees.length; i++){
                                        employees.employeeIDs.push(mappedValue.employees[i].employeeID);
                                        let daysDiff = parseDates(mappedValue.employees[i].fromDate, mappedValue.employees[i].toDate);
                                        if(previousEmployeeDays === 0){
                                            employees = {...employees, daysWorked: daysDiff};
                                        }
                                        else if(daysDiff <= previousEmployeeDays) {
                                            employees = {...employees, daysWorked: daysDiff};
                                        }
                                        previousEmployeeDays = daysDiff;
                                        //totalDays = daysDiff;
                                        console.log(previousEmployeeDays, '-', daysDiff);
                                        console.log(employees);
                                    }
                                    //console.log(employees.daysWorked);
                                    return employees;
                                })
                                .orderBy(e => e.daysWorked, ['desc'])
                                .take(Math.abs(rowsToSelect))
                                .value();

            resolve(filteredData);
        }
        catch(err){
            reject(err);
        }
    });
};

const parseDates = (fromDate, toDate) => {
    let fromDateParsed = moment(fromDate, config.DATE_FORMATS);
    let toDateParsed = moment(toDate === 'NULL' ? new Date() : toDate, config.DATE_FORMATS);

    let difference = fromDateParsed.valueOf() - toDateParsed.valueOf();
    //console.log(fromDateParsed, toDateParsed, fromDateParsed.valueOf());
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