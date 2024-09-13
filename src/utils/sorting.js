export const sortNumber = (data, getVal) => {
    return [...data].sort((a, b) => {
        let aVal = getVal(a);
        let bVal = getVal(b);
        return aVal - bVal;
    });
};

export const sortDate = (data, getVal) => {
    return [...data].sort((a, b) => {
        let aVal = new Date(getVal(a));
        let bVal = new Date(getVal(b));
        return aVal - bVal;
    });
};

export const sortGivenKey = (data, getVal) => {
    return [...data].sort((a, b) => {
        let aVal = getVal(a);
        let bVal = getVal(b);
        if (aVal < bVal) {
            return -1;
        }
        if (aVal > bVal) {
            return 1;
        }
        return 0;
    });
};

export const streamTableSorting = [
    (data) => sortGivenKey(data, (entry) => entry.songName),
    (data) => sortGivenKey(data, (entry) => entry.artist),
    (data) => sortDate(data, (entry) => entry.dateStreamed),
    (data) => sortNumber(data, (entry) => entry.streamCount),
    (data) => sortNumber(data, (entry) => entry.userId),
];
