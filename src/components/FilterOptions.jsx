import { useState, useEffect } from 'react';
import { chainFilter } from '../utils/filtering';
import FilterOption from './FilterOption';

function FilterOptions({ id, data, filtering, renderTable, options }) {
    let [selectedOptions, setSelectedOptions] = useState([]);
    let [selectedFilters, setSelectedFilters] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    let [inputs, setInputs] = useState({});

    useEffect(() => {
        applyFilter();
    }, [data]);

    const applyFilter = () => {
        let filterInputs = selectedOptions.map((option) => inputs[option]);
        let res = chainFilter(data, selectedFilters, filterInputs);
        setFilteredData(res);
    };

    const setValue = (index, input) => {
        setInputs({ ...inputs, [index]: input });
        setSelectedFilters(
            selectedOptions.map((optionIndex) => filtering[optionIndex]),
        );
    };

    const onClick = (index) => {
        let copy = [...selectedOptions];
        if (selectedOptions.includes(index)) {
            let elementIndex = selectedOptions.indexOf(index);
            copy.splice(elementIndex, 1);
        } else {
            copy.push(index);
        }
        setSelectedOptions(copy);
        setSelectedFilters(copy.map((optionIndex) => filtering[optionIndex]));
    };

    return (
        <>
            <details>
                <summary className="mx-4 cursor-pointer text-lg font-bold">
                    Filter Options
                </summary>
                <table className="mx-4 flex-1 flex">
                    <tbody className="w-full">
                        {options.map((option, index) => (
                            <FilterOption
                                id={id}
                                key={`${id}-${index}`}
                                type={option.type}
                                label={option.label}
                                value={index}
                                setValue={setValue}
                                setSelected={onClick}
                                defaultValue={inputs[index]}
                                selected={selectedOptions.includes(index)}
                            />
                        ))}
                    </tbody>
                </table>
                <button
                    className="block my-2 mx-9 bg-slate-700 p-2 text-white rounded-md"
                    onClick={applyFilter}
                >
                    Apply Filters
                </button>
                {JSON.stringify(inputs)}
            </details>
            {renderTable(filteredData)}
        </>
    );
}

export default FilterOptions;
