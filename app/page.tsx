'use client';

import { useState } from 'react';
import { Range } from 'react-range';

export default function Home() {

  
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [random, setRandom] = useState(0);
  
  // Function to handle changes in the range
  const handleChange = (newValues: number[]) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
  };

  

  return (
    <main style={{ fontSize: '2rem', textAlign: 'center', marginTop: '2rem' }}>
      <p> {random}</p>
      <button
        onClick={() => setRandom(Math.floor(Math.random() * (maxValue - minValue + 1) + minValue))}
      >
        Generate New
      </button>
      <br />
      <div style={{ marginTop: '20px' }}>
        <label>Choose Range: </label>
        <Range
          values={[minValue, maxValue]}  // Use separate min and max values
          step={1}
          min={0}
          max={10}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{ 
                height: '8px',
                background: 'gray',
                borderRadius: '4px',
                width: '80%',
                margin: 'auto',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
              }}
            />
          )}
        />
      </div>
      <p>Range: {minValue} to {maxValue}</p>
    </main>
  );
}
