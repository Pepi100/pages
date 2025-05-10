'use client';

import { useState } from 'react';

interface ToggleSwitchProps {
  numberOne: string;
  numberTwo: string;
  optionOneText: string;
  optionTwoText: string;
  onToggleChange: (selectedValue: string) => void;
}

export default function ToggleSwitch({
  numberOne,
  numberTwo,
  optionOneText,
  optionTwoText,
  onToggleChange,
}: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled((prev) => {
      const newState = !prev;
      onToggleChange(newState ? numberOne : numberTwo);
      return newState;
    });
  };

  return (
    <div className="toggle-switch">
      <button
        onClick={handleToggle}
        className={`toggle-button ${enabled ? 'enabled' : 'disabled'}`}
      >
        <span className={`toggle-thumb ${enabled ? 'enabled' : 'disabled'}`}>
          {enabled ? numberOne : numberTwo}
        </span>
      </button>
      <span className="toggle-label">
        {enabled ? optionOneText : optionTwoText}
      </span>
    </div>
  );
}
