import React, { useState, useEffect } from 'react';
import { chainFilter } from '../utils/filtering';
import CheckBoxGroup from './CheckBoxGroup';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import DateInput from './DateInput';
import { defaultFilterOptions } from '../utils/constants';

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
    let [options, setOptions] = useState(defaultFilterOptions);
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

    const inputTestId = (index) => {
        return `${name}-choice-${index}-input`;
    };

    const renderOptions = {
        string: (id, updateValue, defaultValue, index) => (
            <TextInput
                id={id}
                testId={inputTestId(index)}
                updateValue={updateValue}
                defaultValue={defaultValue}
            />
        ),
        number: (id, updateValue, defaultValue, index) => (
            <NumberInput
                id={id}
                testId={inputTestId(index)}
                updateValue={updateValue}
                defaultValue={defaultValue}
                minVal={min[index]}
                maxVal={max[index]}
            />
        ),
        date: (id, updateValue, defaultValue, index) => (
            <DateInput
                id={id}
                testId={inputTestId(index)}
                updateValue={updateValue}
                defaultValue={defaultValue}
            />
        ),
    };

    const sectionTestId = () => {
        return `${name}-filter-options`;
    };

    const applyFilterTestId = () => {
        return `${name}-apply-filters`;
    };

    return (
        <>
            <details data-testid={sectionTestId()} className="flex">
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
                    data-testid={applyFilterTestId()}
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
