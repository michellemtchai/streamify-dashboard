export const dateToDateString = (date) => {
    date = date ?? new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}/${month}/${day}`;
};

export const dateStringToInt = (str) => {
    return new Date(str).getTime();
};

export const dateToInt = (date) => {
    return dateStringToInt(dateToDateString(date));
};
