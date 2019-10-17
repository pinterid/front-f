export const getCalendarFromStructure = (structure) => {
    return calculateColorsForCalendarDay(structure.contributions.years);
}

const calculateColorsForCalendarDay = (rawCalendar) => {
    rawCalendar.forEach(_year => {

        let busiestDay = 0;

        // Calculate busiest day of the year
        Object.values(_year.calendar).forEach(_day => {
            if (_day.total > busiestDay) {
                busiestDay = _day.total;
            }
        })

        Object.values(_year.calendar).forEach(_day => {
            let precision = _day.total / busiestDay;
            if (precision > 0.8 && precision <= 1) {
                _day.color = "#196127";
            } else if (precision > 0.6 && precision <= 0.8) {
                _day.color = "#239a3b";
            } else if (precision > 0.4 && precision <= 0.6) {
                _day.color = "#7bc96f";
            } else if (precision > 0.0 && precision <= 0.4) {
                _day.color = "#c6e48b";
            } else if (precision === 0) {
                _day.color = "#ebedf0";
            }
        })
    })
    return rawCalendar;
}
