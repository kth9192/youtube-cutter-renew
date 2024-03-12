'use client';

import { randomInt, randomUUID } from 'crypto';
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface InputRangeProps {
  max: number;
  values: number[];
  onChange: (value: number[]) => void;
}

function Slider({ max, values, onChange }: InputRangeProps) {
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-[32px]">
      <Range
        min={max ? 0 : -1}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="w-full flex h-[36px]"
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              className="w-full h-[5px] rounded-[4px]"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#eb9898', '#ccc'],
                  min: 0,
                  max: max,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className="flex justify-center items-center w-[20px] h-[20px] bg-red-500 rounded-full"
            style={{
              ...props.style,

              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              className="w-[5px] h-4"
              // style={{
              //   backgroundColor: isDragged ? '#548BF4' : '#CCC',
              // }}
            />
          </div>
        )}
      />
    </div>
  );
}

export default Slider;
