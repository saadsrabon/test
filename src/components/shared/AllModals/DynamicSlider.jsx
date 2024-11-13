import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export function DynamicSlider({ className, sliderValue, setSliderValue, min, max, ...props }) {
    return (
        <Slider
            value={sliderValue}   // Set the value from parent state
            onValueChange={setSliderValue}  // Update the parent state when value changes
            min={min}
            max={max || 200}
            step={1}
            className={cn("", className)}
            {...props}
        />
    );
}