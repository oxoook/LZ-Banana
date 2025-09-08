
import React from 'react';

interface PromptInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const PromptInput: React.FC<PromptInputProps> = (props) => {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
};

export default PromptInput;
