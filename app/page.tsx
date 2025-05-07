'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { VALUE_STEPS, toSinoKorean} from './constants';


export default function Home() {
  // Immutable array of possible values


  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  const [random, setRandom] = useState(0);

  // Function to handle changes in the range
  const handleChange = (newValues: number[]) => {
    setMinValue(newValues[0]);
    setMaxValue(newValues[1]);
  };

  // Separate function to generate a new random value
  const generateRandomValue = () => {
    const old = random;
    const random_stage = Math.floor(Math.random() * (maxValue - minValue) + minValue);

    const min = VALUE_STEPS[random_stage];
    const max = VALUE_STEPS[random_stage + 1];
  

    let newRandom = old;
    while(newRandom == old)
      newRandom = Math.floor(Math.random() * (max - min + 1) + min);

    console.log(newRandom)
    setRandom(newRandom);

    
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
          <div {...props} className='range-track'>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className='range-thumb'/>
        )}
      />
    </div>
  
    <p>Range: {VALUE_STEPS[minValue]} to {VALUE_STEPS[maxValue]}</p>
  
    <button onClick={generateRandomValue}>Generate New</button>
  
    <div style={{ marginTop: '30px' }}>
      <label>
        <input type="radio" name="option" value="option1" defaultChecked />
        Option 1
      </label>
      <br />
      <label>
        <input type="radio" name="option" value="option2" />
        Option 2
      </label>
      <br /><br />
      <input type="text" placeholder="Type something..." style={{ fontSize: '1rem', padding: '0.5rem' }} />
    </div>
  </main>
  
  );
}
