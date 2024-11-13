'use client';
import { useState } from 'react';

const FilterSlider = () => {
    const [value, setValue] = useState(20);
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div>
            <h2>{value}</h2>
            <input
                type="range"
                onChange={handleChange}
                defaultValue={value}
                min={10}
                max={200}
                className="w-full accent-tertiary rounded-md"
                step={10}
            />
        </div>
    );
};

export default FilterSlider;