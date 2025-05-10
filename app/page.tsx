'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { VALUE_STEPS, toSinoKorean} from './constants';
import ToggleSwitch from './components/ToggleSwitch'; // adjust path if needed


export default function Home() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  const [random, setRandom] = useState(-1);

  const [sino, setSino] = useState(1);
  const [numberToKorean, setNumberToKorean] = useState(1);

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  // Function to handle changes in the range
  const setRange = (newValues: number[]) => {
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
    <p className={`main-number-mobile ${random === -1 ? 'text-sm' : 'text-dynamic'}`} onClick={generateRandomValue}>
      {random === -1 ? "Tap to generate" : random}
    </p>

    <div className="menu-mobile">
      
      <Range values={[minValue, maxValue]}
        step={1}
        min={0}
        max={5}
        onChange={setRange}
        renderTrack={({ props, children }) => (
          <div {...props} className='range-track'>
            {children}
          </div>
        )}  
        renderThumb={({ props }) => (
          <div {...props} className='range-thumb'/>
        )}
      />
      <div className="range-labels">
        {VALUE_STEPS.map((label, index) => (
          <span key={index} className="range-label">
            {(index)}
          </span>
        ))}
      </div>
      
      <div className='buttons-mobile'>

        <ToggleSwitch 
          numberOne="일"
          numberTwo="1"
          optionOneText="Korean-to-number"
          optionTwoText="Number-to-Korean"
          onToggleChange={() => setNumberToKorean(1 - numberToKorean)}
        />

        <ToggleSwitch 
          numberOne="한"
          numberTwo="일"
          optionOneText="Native Korean"
          optionTwoText="Sino-Korean   "
          onToggleChange={() => setSino(1 - sino)}  // Pass the callback
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
      className="input-field"  /* Apply the CSS class */
    />
        <p style={{ marginTop: '10px', color: feedback.includes('Correct') ? 'green' : 'red' }}></p>
        
    </div>
  
  </main>
  
  );
}
