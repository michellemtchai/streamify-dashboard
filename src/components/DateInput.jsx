import { useState, useEffect } from 'react';
import RadioGroup from './RadioGroup';
import {
    dateInputLabels,
    dateInputTypes,
    dateInputDefaults,
} from '../utils/constants';
import DatePicker from './DatePicker';

function DateInput({ id, updateValue, defaultValue }) {
    let [checkedIndex, setCheckedIndex] = useState(0);
    let [checkedVal, setCheckedVal] = useState(dateInputTypes[checkedIndex]);
    const [dates, setDates] = useState(dateInputDefaults);
    const onChange = (index) => {
        let newVal = dateInputTypes[index];
        setCheckedIndex(index);
        setCheckedVal(newVal);
        updateValue({ type: newVal, ...dates[newVal] });
    };
    const setSingleDate = (date) => {
        let newVal = { ...dates, [checkedVal]: { date: date } };
        setDates(newVal);
        updateValue({ type: checkedVal, ...newVal[checkedVal] });
    };
    const setRangeDate = (range) => {
        let newVal = {
            ...dates,
            [checkedVal]: { start: range[0], end: range[1] },
        };
        setDates(newVal);
        updateValue({ type: checkedVal, ...newVal[checkedVal] });
    };
    const dateInputOptions = [
        <DatePicker
            range={false}
            updateValue={setSingleDate}
            defaultValue={dates.on}
        />,
        <DatePicker
            range={false}
            updateValue={setSingleDate}
            defaultValue={dates.before}
        />,
        <DatePicker
            range={false}
            updateValue={setSingleDate}
            defaultValue={dates.after}
        />,
        <DatePicker
            range={true}
            updateValue={setRangeDate}
            defaultValue={dates.between}
        />,
    ];
    useEffect(() => {
        let index = dateInputTypes.indexOf(defaultValue?.type);
        if (index == -1) {
            updateValue({ type: checkedVal, dates: dates[checkedVal] });
        } else {
            setCheckedIndex(index);
            setCheckedVal(dateInputTypes[index]);
        }
    }, []);
    return (
        <RadioGroup
            name={`${id}-date`}
            data={dateInputLabels}
            defaultValue={checkedIndex}
            updateValue={onChange}
            components={dateInputOptions}
        />
    );
}

export default DateInput;
