let todayYearMonthDay = () => {
    let currMonth = Js.Date.getMonth;
    let month = currMonth;
    let day = Js.Date.getDate;
    let fullYear = Js.Date.getFullYear;
    {j|$fullYear-$month-$day|j};
}
