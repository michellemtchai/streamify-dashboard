import React, { useState, useEffect } from 'react';
import { chainFilter } from '../utils/filtering';
import CheckBoxGroup from './CheckBoxGroup';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import DateInput from './DateInput';

function FilterOptions({
    name,
    data,
    filtering,
    renderTable,
    labels,
    types,
    min,
    max,
}) {
    let [options, setOptions] = useState({
        selected: [],
        inputs: {},
    });
    let [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        applyFilter();
    }, [data]);

    const applyFilter = () => {
        let filterInputs = options.selected.map(
            (option) => options.inputs[option],
        );
        let selectedFilters = options.selected.map(
            (optionIndex) => filtering[optionIndex],
        );
        let res = chainFilter(data, selectedFilters, filterInputs);
        setFilteredData(res);
    };

    const renderOptions = {
        string: (id, updateValue, defaultValue, index) => (
            <TextInput
                id={id}
                updateValue={updateValue}
                defaultValue={defaultValue}
            />
        ),
        number: (id, updateValue, defaultValue, index) => (
            <NumberInput
                id={id}
                updateValue={updateValue}
                defaultValue={defaultValue}
                minVal={min[index]}
                maxVal={max[index]}
            />
        ),
        date: (id, updateValue, defaultValue, index) => (
            <DateInput
                id={id}
                updateValue={updateValue}
                defaultValue={defaultValue}
            />
        ),
    };

    return (
        <>
            <details className="flex">
                <summary className="mx-4 cursor-pointer text-lg font-bold">
                    Filter Options
                </summary>
                <CheckBoxGroup
                    name={name}
                    labels={labels}
                    defaultValue={options.inputs}
                    updateValue={setOptions}
                    components={types.map((type) => renderOptions[type])}
                />
                <button
                    className="block my-2 mx-9 bg-slate-700 p-2 text-white rounded-md"
                    onClick={applyFilter}
                >
                    Apply Filters
                </button>
            </details>
            {renderTable(filteredData)}
        </>
    );
}

export default FilterOptions;
