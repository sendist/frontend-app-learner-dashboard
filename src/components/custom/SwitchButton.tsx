import React, { useState } from 'react';

interface SwitchButtonProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ enabled, onChange }) => {
  const toggleSwitch = () => {
    onChange(!enabled);
  };

  return (
    <div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default SwitchButton;
