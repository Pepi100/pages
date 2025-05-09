// components/ToggleSwitch.tsx
'use client';

import { useState } from 'react';

interface ToggleSwitchProps {
  numberOne: string;
  numberTwo: string;
  optionOneText: string;
  optionTwoText: string;
  onToggleChange: (selectedValue: string) => void;  // callback to notify the parent
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
      onToggleChange(newState ? numberOne : numberTwo);  // Pass the selected value back
      return newState;
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleToggle}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } flex h-4 w-4 transform rounded-full bg-black transition items-center justify-center text-[10px] text-white`}
        >
          {enabled ? numberOne : numberTwo}
        </span>
      </button>
      <span className="text-sm font-medium text-gray-800">
        {enabled ? optionOneText : optionTwoText}
      </span>
    </div>
  );
}
