import { cn } from '@/lib/utils';
import { Range } from 'react-range';

const CustomRangeSlider = ({ className, values, setValues, min, max }) => {

    const BARS_COUNT = 25; // Number of static bars
    const START_GAP = 10; // Percent of the width with no bars (e.g., the first inch)

    // Calculate the width of each bar based on the available width after the gap
    const barWidth = (100 - START_GAP) / BARS_COUNT;

    // Determine the color of the bar based on whether it is active
    const getBarColor = (barIndex) => {
        const barValue = (barIndex / BARS_COUNT) * (max - min) + min; // Calculate the value corresponding to the bar index
        return barValue >= values[0] - (((values[0] / 50) * 100) > 50 ? (max > 700 ? 44 : 12) : 16) && barValue <= values[1] - (max > 700 ? 36 : 4) ? 'black' : 'lightgray';
    };

    return (
        <div className={cn('p-2.5', { className })}>
            <div className='flex items-end gap-0.5 rounded-t'>
                {/* Empty space for the gap */}
                <div style={{ width: `${START_GAP}%` }}></div>

                {/* Render the static bars */}
                {Array.from({ length: BARS_COUNT }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-t-[2px]"
                        style={{
                            height: `${bars[index]}px`,
                            width: `${barWidth}%`,
                            backgroundColor: getBarColor(index), // Set the color dynamically based on the bar index
                        }}
                    />
                ))}
            </div>
            <Range
                values={values}
                step={1}
                min={min || 0}
                max={max || 100}
                onChange={(newValues) => {
                    // Clamp the new values to ensure they stay within the min and max range
                    const clampedValues = newValues.map((value) =>
                        Math.min(Math.max(value, min), max)
                    );
                    setValues(clampedValues);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-0.5 w-full bg-gray-200 relative"
                    >
                        {/* Filled portion of the track */}
                        <div
                            className="absolute h-0.5 bg-gray-800"
                            style={{
                                left: `${((values[0] - min) / (max - min)) * 100}%`,
                                right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="bg-white border-[0.01px] drop-shadow-sm rounded-full shadow-md focus:outline-none h-8 w-8"
                    />
                )}
            />
        </div>
    );
};


export default CustomRangeSlider;

const bars = [0, 4, 6, 12, 8, 40, 24, 33, 48, 56, 24, 45, 34, 34, 26, 36, 22, 56, 26, 40, 50, 30, 6, 10, 25]
