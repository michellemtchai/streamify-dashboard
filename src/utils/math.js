export const dataMinMax = (data = [], keys, entryKeys) => {
    let min = {};
    let max = {};
    for (let entry of data) {
        for (let key of keys) {
            let index = entryKeys.indexOf(key);
            if (!min[index]) {
                min[index] = entry[key];
            }
            if (!max[index]) {
                max[index] = entry[key];
            }
            if (min[index] > entry[key]) {
                min[index] = entry[key];
            }
            if (max[index] < entry[key]) {
                max[index] = entry[key];
            }
        }
    }
    return { min, max };
};

export const sliderValToSelectedVal = (value, min, max) => {
    let distance = max - min;
    return Math.floor(distance * (value / 100)) + min;
};

export const selectedValToSliderVal = (value, min, max) => {
    let totalDistance = max - min;
    let distance = value - min;
    let percent = Math.floor((distance / totalDistance) * 100);
    return percent;
};
