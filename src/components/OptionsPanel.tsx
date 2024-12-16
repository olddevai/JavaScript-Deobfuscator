import React from 'react';
import { DeobfuscationOptions } from '../types/deobfuscator';

interface OptionsPanelProps {
  options: DeobfuscationOptions;
  onChange: (options: DeobfuscationOptions) => void;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, onChange }) => {
  const handleOptionChange = (key: keyof DeobfuscationOptions) => {
    onChange({ ...options, [key]: !options[key] });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Deobfuscation Options</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(options).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleOptionChange(key as keyof DeobfuscationOptions)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};