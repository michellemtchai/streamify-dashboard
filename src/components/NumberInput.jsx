import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import LabelledEntry from './LabelledEntry';

function NumberInput({ id, defaultValue, setInput, updateValue }) {
    let [min, setMin] = useState(0);
    let [max, setMax] = useState(100);
    let minId = `${id}-min`;
    let maxId = `${id}-max`;

    const onChange = (values) => {
        let input = { min: values[0], max: values[1] };
        setMin(values[0]);
        setMax(values[1]);
        setInput(input);
        updateValue(input);
    };

    useEffect(() => {
        if (defaultValue?.min) {
            setMin(defaultValue.min);
        }
        if (defaultValue?.max) {
            setMax(defaultValue.max);
        }
        let input = { min, max };
        setInput(input);
        updateValue(input);
    }, []);

    return (
        <>
            <LabelledEntry label="Min" value={min} />
            <ReactSlider
                className="horizontal-slider flex-1"
                thumbClassName="bg-slate-500 rounded-full w-5 h-5 text-sm text-white py-2 text-center top-2"
                thumbActiveClassName="bg-slate-700"
                trackClassName="bg-sky-400 odd:bg-sky-100 top-4 h-1"
                value={[min, max]}
                ariaLabel={['Min', 'Max']}
                ariaValuetext={(state) =>
                    `${state.index == 0 ? 'Min' : 'Max'} ${state.valueNow}`
                }
                renderThumb={(props, state) => (
                    <div key={props.key} {...props} />
                )}
                renderTrack={(props, state) => (
                    <div key={props.key} {...props} />
                )}
                pearling
                minDistance={10}
                onChange={onChange}
            />
            <LabelledEntry label="Max" value={max} />
        </>
    );
}

export default NumberInput;
