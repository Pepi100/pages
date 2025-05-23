'use client';

import { useState } from 'react';
import { Range } from 'react-range';
import { VALUE_STEPS, toSinoKorean, toNativeKorean} from './constants';
import ToggleSwitch from './components/ToggleSwitch'; // adjust path if needed


export default function Home() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  const [random, setRandom] = useState(-1);

  const [sino, setSino] = useState(1);
  const [numberToKorean, setNumberToKorean] = useState(0);

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState(0);

  // Function to handle changes in the range
  const setRange = (newValues: number[]) => {
    if(newValues[0] === newValues[1]){
      newValues[0] = minValue;
      newValues[1] = maxValue;
    }else{
      if(sino == 1){
        setMinValue(newValues[0]);
        setMaxValue(newValues[1]);
      }else{
        const nv1 = Math.min(1, newValues[0]);
        const nv2 = Math.min(2, newValues[1]); 
        setMinValue(nv1);
        setMaxValue(nv2);
      }
      
    }
    
  };

  // Separate function to generate a new random value
  const generateRandomValue = () => {
    const old = random;
    const random_stage = Math.floor(Math.random() * (maxValue - minValue) + minValue);

    const min = VALUE_STEPS[random_stage];
    const max = VALUE_STEPS[random_stage + 1];
  

    let newRandomNumber = old;
    while(newRandomNumber == old)
      newRandomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    setRandom(newRandomNumber);

    setUserInput("");
    setFeedback("");
    setFeedbackStatus(0);

    
  };

  const getOutput = () =>{
    if (numberToKorean === 1){
      return random;
    }else{
      if(sino){
        return toSinoKorean(random);
      }else{
        return toNativeKorean(random);
      }

    }
  } 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  

  const checkAnswer = () => {

    if(feedbackStatus == 0){
      const input_format = userInput.replace(/\s+/g, '');
      if (numberToKorean === 1){
        if(sino){
          if(toSinoKorean(random) == input_format)
            setFeedback('Correct!');
          else
            setFeedback('Incorrect, the answer was ' + toSinoKorean(random) +'.');
        }else{
          if(toNativeKorean(random) == input_format)
            setFeedback('Correct!');
          else
            setFeedback('Incorrect, the answer was ' + toNativeKorean(random)+'.')
        }
      }else{
        const number = Number(input_format)
        if(random == number)
          setFeedback('Correct!');
        else
          setFeedback('Incorrect, the answer was ' + random);
      }
      setFeedbackStatus(1);
    }else{
      setUserInput("");
      generateRandomValue();
      setFeedback("");
      setFeedbackStatus(0);
    }


  
  };

  return (
    <main style={{ fontSize: '2rem', textAlign: 'center', marginTop: '2rem' }}>
      <div className="layout-container">
        <p className={`main-number-mobile ${random === -1 ? 'text-sm' : 'text-dynamic'}`} onClick={generateRandomValue}>
          {random === -1 ? "Tap to generate" : getOutput()}
        </p>

        <div className="menu-mobile">
          <p className="settings-label" >Settings:</p>
          <p className="ranges-label" >Number range:</p>
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
            {["0", "10", "100", "1000", "10000", "99999"].map((label, index) => (
              <div key={index} className="range-label" style={{ textAlign: "center",
                  flex: 1,
                  opacity: sino == 0 && index > 2 ? 0.3 : 1, // gray out if not allowed
                  pointerEvents: "none", }}>
                <div style={{ fontSize: "0.5rem", lineHeight: "0.3rem", marginTop: "0.5rem" }}>|</div> {/* Tick mark */}
                <div style={{ fontSize: "0.4em", marginTop: "0.5rem" }}>{label}</div> {/* Small label */}
              </div>
            ))}
          </div>
        
          <div className='buttons-mobile'>

            <ToggleSwitch 
              numberOne="1"
              numberTwo="일"
              optionOneText="Number-to-Korean"
              optionTwoText="Korean-to-number"
              onToggleChange={() => setNumberToKorean(1 - numberToKorean)}
            />

            <ToggleSwitch 
              numberOne="한"
              numberTwo="일"
              optionOneText="Native Korean"
              optionTwoText="Sino-Korean"
              onToggleChange={() => {if(sino == 1) setRange([Math.min(1, minValue), Math.min(2, maxValue)]); setSino(1 - sino); }}  // Pass the callback
            />
          
          </div>        
        </div>
      </div>
  
      <div style={{ marginTop: '30px' }}>
        <input
          type= {numberToKorean === 1 ? "text" : "number"}
          placeholder="Type your answer..."
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkAnswer();
            }
          }}
          className="input-field"
        />
        <p style={{ marginTop: '10px', color: feedback.includes('Correct') ? 'green' : 'red' }}>{feedback}</p>
      </div>
    </main>
  
  );
}
