import { convertSliderFormat } from '@/shared/utils';
import React from 'react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface SliderProps {
  min: number | undefined;
  max: number;
  value: number | Range;
  onChange: (value: number | Range) => void;
  onChangeComplete?: (value: number | Range) => void;
}

function Slider({ min, max, value, onChange, onChangeComplete }: SliderProps) {


  console.log('slider',min,max ,value);
  
  return (
    <div className="flex w-[80%] lg:w-[900px] justify-center items-center relative">
      <div className="flex w-full h-[5px] bg-gray-200 rounded-xl absolute"></div>
      <InputRange
        step={1}
        value={value}
        minValue={min}
        maxValue={max}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
        formatLabel={(value) => convertSliderFormat(value)}
      />
    </div>
  );
}

export default Slider;
