import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import LabelledEntry from './LabelledEntry';

function NumberInput({ id, defaultValue, updateValue }) {
    let [min, setMin] = useState(0);
    let [max, setMax] = useState(100);
    let minId = `${id}-min`;
    let maxId = `${id}-max`;

    const onChange = (values) => {
        let input = { min: values[0], max: values[1] };
        setMin(values[0]);
        setMax(values[1]);
        updateValue(input);
    };

    useEffect(() => {
        if (defaultValue?.min || defaultValue?.max) {
            setMin(defaultValue?.min);
            setMax(defaultValue?.max);
        } else {
            let input = { min, max };
            updateValue(input);
        }
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
            <LabelledEntry label="Max" value={max} />
        </>
    );
}

export default NumberInput;
