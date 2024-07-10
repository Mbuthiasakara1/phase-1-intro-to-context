// Your code here
function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(employeeData) {
  return employeeData.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, timeStamp) {
  const [date, time] = timeStamp.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(time),
    date: date,
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
  const [date, time] = timeStamp.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(time),
    date: date,
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOut = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeIn && timeOut) {
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  } else {
    return 0;
  }
}
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wagesEarned = hoursWorked * payRate;
  return wagesEarned;
}
function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);

  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return totalWages;
}
function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);

  return totalPayroll;
}
