import * as React from "react";

export interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  id?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      className = "",
      id,
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange?.([parseInt(e.target.value)])}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600 ${className}`}
      />
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
