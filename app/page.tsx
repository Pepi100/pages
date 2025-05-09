'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { VALUE_STEPS, toSinoKorean} from './constants';
import ToggleSwitch from './components/ToggleSwitch'; // adjust path if needed


export default function Home() {
  // Immutable array of possible values


  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  const [random, setRandom] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  // const [selectedValue, setSelectedValue] = useState<string>("2"); // Initial value




  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

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

    setRandom(newRandom);

    
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  

  const checkAnswer = () => {
    
    const input_format = userInput.replace(/\s+/g, '');
    if(toSinoKorean(random) == input_format )
      setFeedback('Correct!');
    else{
      setFeedback('Incorrect, the answer was ' + toSinoKorean(random))
    }
  
  };

  return (
    <main style={{ fontSize: '2rem', textAlign: 'center', marginTop: '2rem' }}>
    <p className="main-number-mobile" >{random}</p>

    <div className="menu-mobile">
      
      <Range values={[minValue, maxValue]}
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
      <p>Range: {VALUE_STEPS[minValue]} to {VALUE_STEPS[maxValue]}</p>
      
      <div className='buttons-mobile'>
      <ToggleSwitch 
        numberOne="1"
        numberTwo="2"
        optionOneText="Option 1 selected"
        optionTwoText="Option 2 selected"
        onToggleChange={generateRandomValue}  // Pass the callback
      />
      <ToggleSwitch 
        numberOne="1"
        numberTwo="2"
        optionOneText="Option 1 selected"
        optionTwoText="Option 2 selected"
        onToggleChange={generateRandomValue}  // Pass the callback
      />
      </div>

      
    </div>
  
      
  
    <div style={{ marginTop: '30px' }}>

      <input
          type="text"
          placeholder="Type your answer..."
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkAnswer();
            }
          }}
          style={{ fontSize: '1rem', padding: '0.5rem' }}
        />
        <p style={{ marginTop: '10px', color: feedback.includes('Correct') ? 'green' : 'red' }}></p>
        
    </div>
  
  </main>
  
  );
}
