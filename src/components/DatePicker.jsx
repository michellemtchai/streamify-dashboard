import React from 'react';

import { default as ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from './DatePickerInput';

function DatePicker({ range, updateValue, defaultValue }) {
    const ref = React.createRef();
    const onChangeRange = (dates) => {
        updateValue(dates);
    };
    const onChangeSingle = (date) => {
        updateValue(date);
    };
    return range ? (
        <ReactDatePicker
            showIcon
            selectsRange
            className="rounded border border-slate-200 border-solid"
            startDate={defaultValue.start}
            endDate={defaultValue.end}
            onChange={onChangeRange}
            customInput={<DatePickerInput ref={ref} />}
        />
    ) : (
        <ReactDatePicker
            showIcon
            className="rounded border border-slate-200 border-solid"
            selected={defaultValue.date}
            onChange={onChangeSingle}
            customInput={<DatePickerInput ref={ref} />}
        />
    );
}

export default DatePicker;
