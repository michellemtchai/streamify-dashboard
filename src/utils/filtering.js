import { dateToDateString, dateStringToInt, dateToInt } from './dates';

export const filterByString = (entry, input, getVal) => {
    let val = getVal(entry);
    let formattedVal = val.toLowerCase();
    let formattedInput = input.toLowerCase();
    return formattedVal.includes(formattedInput);
};

export const filterByNumber = (entry, input, getVal) => {
    let val = getVal(entry);
    let { min, max } = input;
    return val >= min && val <= max;
};

export const filterByDate = (entry, input, getVal) => {
    let inputDate = getVal(entry);
    let val = dateStringToInt(inputDate);
    let { type, date, start, end } = input;
    let selectedDate = dateToInt(date);
    let startDate = dateToInt(start);
    let endDate = dateToInt(end);
    switch (type) {
        case 'on':
            return val == selectedDate;
        case 'before':
            return val < selectedDate;
        case 'after':
            return val > selectedDate;
        case 'between':
            return val >= startDate && val <= endDate;
        default:
            return false;
    }
};

export const chainFilter = (data = [], filters, inputs) => {
    let res = [];
    for (let entry of data) {
        let passFilter = true;
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            let input = inputs[i];
            if (!filter(entry, input)) {
                passFilter = false;
                break;
            }
        }
        if (passFilter) {
            res.push(entry);
        }
    }
    return res;
};

export const streamTableFiltering = [
    (entry, input) => filterByString(entry, input, (entry) => entry.songName),
    (entry, input) => filterByString(entry, input, (entry) => entry.artist),
    (entry, input) => filterByDate(entry, input, (entry) => entry.dateStreamed),
    (entry, input) =>
        filterByNumber(entry, input, (entry) => entry.streamCount),
    (entry, input) => filterByNumber(entry, input, (entry) => entry.userId),
];
