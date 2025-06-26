export function isThirtyOneDaysIf(month){
    if(month === "Jan" || month === "Mar" || month === "May" || month == "Jul" || month === "Aug" || month === "Oct" || month === "Dec") {
        return true;
    }else if(month === "Feb" || month === "Jun" || month === "Apr" || month === "Sep" || month === "Nov") {
        return false;
    }else {
        return "Invalid month";
    }
}

// console.log(isThirtyOneDaysIf("Jan")); 
// console.log(isThirtyOneDaysIf("Mar"));
// console.log(isThirtyOneDaysIf("May"));
// console.log(isThirtyOneDaysIf("Jul"));
// console.log(isThirtyOneDaysIf("Aug"));
// console.log(isThirtyOneDaysIf("Oct"));
// console.log(isThirtyOneDaysIf("Dec"));
// console.log(isThirtyOneDaysIf("Feb"));
// console.log(isThirtyOneDaysIf("Apr"));
// console.log(isThirtyOneDaysIf("Jun"));
// console.log(isThirtyOneDaysIf("Sep"));
// console.log(isThirtyOneDaysIf("Nov"));
// console.log(isThirtyOneDaysIf("Month")); // Invalid month
