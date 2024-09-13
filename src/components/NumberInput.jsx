import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import LabelledEntry from './LabelledEntry';
import { sliderValToSelectedVal, selectedValToSliderVal } from '../utils/math';

function NumberInput({
    testId,
    id,
    defaultValue,
    updateValue,
    minVal,
    maxVal,
}) {
    let [min, setMin] = useState(0);
    let [max, setMax] = useState(100);
    let [calculatedValues, setCalculatedValues] = useState({
        min: minVal,
        max: maxVal,
    });
    let minId = `${id}-min`;
    let maxId = `${id}-max`;

    const onChange = (values) => {
        let calculatedMin = sliderValToSelectedVal(values[0], minVal, maxVal);
        let calculatedMax = sliderValToSelectedVal(values[1], minVal, maxVal);
        let input = { min: calculatedMin, max: calculatedMax };
        setMin(values[0]);
        setMax(values[1]);
        setCalculatedValues(input);
        updateValue(input);
    };

    useEffect(() => {
        if (defaultValue?.min || defaultValue?.max) {
            let calculatedMin = selectedValToSliderVal(
                defaultValue?.min,
                minVal,
                maxVal,
            );
            let calculatedMax = selectedValToSliderVal(
                defaultValue?.max,
                minVal,
                maxVal,
            );
            setMin(calculatedMin);
            setMax(calculatedMax);
            setCalculatedValues(defaultValue);
        } else {
            updateValue(calculatedValues);
        }
    }, []);

    const formatTestId = (label) => {
        return `${testId}-${label}`;
    };

    return (
        <>
            <LabelledEntry
                testId={formatTestId('min')}
                label="Min"
                value={calculatedValues.min}
            />
            <ReactSlider
                className="horizontal-slider flex-1"
                thumbClassName="bg-slate-500 rounded-full w-5 h-5 text-sm text-white py-2 text-center top-2"
                thumbActiveClassName="bg-slate-700"
                trackClassName="bg-sky-400 odd:bg-sky-100 top-4 h-1"
                value={[min, max]}
                ariaLabel={['Min', 'Max']}
                ariaValuetext={(state) =>
                    `${state.index == 0 ? 'Min' : 'Max'} ${
                        state.index == 0
                            ? calculatedValues.min
                            : calculatedValues.max
                    }`
                }
                renderThumb={(props, state) => {
                    let { key, ...others } = props;
                    return <div key={key} {...others} />;
                }}
                renderTrack={(props, state) => {
                    let { key, ...others } = props;
                    return <div key={key} {...others} />;
                }}
                pearling
                minDistance={10}
                onChange={onChange}
            />
            <LabelledEntry
                testId={formatTestId('max')}
                label="Max"
                value={calculatedValues.max}
            />
        </>
    );
}

export default NumberInput;
