'use client';

import { useState } from 'react';
import { Range } from 'react-range';

export default function Home() {
  // Immutable array of possible values
  const value = Object.freeze([0, 10, 100, 1000, 10000, 99999]);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5);
  const [random, setRandom] = useState(0);

  // Function to handle changes in the range
  const handleChange = (newValues: number[]) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
  };

  // Separate function to generate a new random value
  const generateRandomValue = () => {
    const random_stage = Math.floor(Math.random() * (maxValue - minValue) + minValue);

    const min = value[random_stage];
    const max = value[random_stage + 1];
    const newRandom = Math.floor(Math.random() * (max - min + 1) + min);
    setRandom(newRandom);
    console.log('Random Stage Index:', random_stage);
    console.log('Range:', min, 'to', max);
    console.log('Generated Random Value:', newRandom);

  };

  return (
    <main style={{ fontSize: '2rem', textAlign: 'center', marginTop: '2rem' }}>
      <p>{random}</p>
      
      <br />
      <div style={{ marginTop: '20px' }}>
        <label>Choose Range: </label>
        <Range
          values={[minValue, maxValue]}
          step={1}
          min={0}
          max={5}
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
      <p>Range: {value[minValue]} to {value[maxValue]}</p>

      <button onClick={generateRandomValue}>Generate New</button>
    </main>
  );
}
