export function isThirtyOneDaysSwitch(month) {
    switch (month) {
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        case "Feb":
        case "Apr":
        case "Jun":
        case "Sep":
        case "Nov":
            return false;
        default:
            return "Invalid month";
    }
}

//動作確認
// console.log(isThirtyOneDaysSwitch("Jan")); 
// console.log(isThirtyOneDaysSwitch("Mar"));
// console.log(isThirtyOneDaysSwitch("May"));
// console.log(isThirtyOneDaysSwitch("Jul"));
// console.log(isThirtyOneDaysSwitch("Aug"));
// console.log(isThirtyOneDaysSwitch("Oct"));
// console.log(isThirtyOneDaysSwitch("Dec"));
// console.log(isThirtyOneDaysSwitch("Feb"));
// console.log(isThirtyOneDaysSwitch("Apr"));
// console.log(isThirtyOneDaysSwitch("Jun"));
// console.log(isThirtyOneDaysSwitch("Sep"));
// console.log(isThirtyOneDaysSwitch("Nov"));
// console.log(isThirtyOneDaysSwitch("Month")); // Invalid month