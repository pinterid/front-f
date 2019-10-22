// Import JSON structure
import {
    calendarStructure,
    daysStructure,
    dayStructure
} from './Objects';

// Formats a date to YYYY-MM-DD format
const formatDate = (date) => { return date.toISOString().split('T')[0] };

// Returns a calendar structure
export const getCalendarFromStructure = (structure) => {
    let calendar = calculateColorsForCalendarDay(structure.contributions.years);
    return calculateCalendar(calendar);
}

// Parses the raw calendar
const calculateCalendar = (calendar) => {
    let preCalendar = calendar;
    let fullYear = new Date(Object.keys(preCalendar)[0]).getFullYear();
    let years = [];
    let date = null;

    Object.values(preCalendar).forEach(preYear => {
        date = new Date(fullYear, 0, 1); 
        let fullCalendar = JSON.parse(JSON.stringify(calendarStructure));

        for (let indexW = 0; indexW < 53; indexW++) {
            let week = JSON.parse(JSON.stringify(daysStructure));
            for (let indexD = 0; indexD <= 6; indexD++) {
                let day = JSON.parse(JSON.stringify(dayStructure));
                date.setDate(date.getDate() + 1);
                day.date = formatDate(new Date(date));

                let dayDate = formatDate(date);
                try {
                    day.color = preYear.calendar[dayDate].color;
                    day.contributionCount = preYear.calendar[dayDate].total;
                    fullCalendar.contributionCalendar.totalContributions += day.contributionCount;
                }
                catch (TypeError) {
                    day.contributionCount = 0;
                    day.color = "#ebedf0";
                }
                week.contributionDays.push(day);

            }
            fullCalendar.contributionCalendar.weeks.push(week);
        }
        fullYear++;
        years.push(JSON.parse(JSON.stringify(fullCalendar)));
    })
    return years
}

// Fill the raw calendar structure with the correct colors
const calculateColorsForCalendarDay = (rawCalendar) => {
    Object.values(rawCalendar).forEach(_year => {
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
