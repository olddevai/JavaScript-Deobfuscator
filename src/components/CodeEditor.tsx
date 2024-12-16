import React from 'react';
import { Copy, Download, Upload } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  label: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  readOnly = false,
  label,
}) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deobfuscated-code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-lg font-semibold text-gray-700">{label}</label>
        <div className="flex gap-2">
          {!readOnly && (
            <label className="cursor-pointer">
              <Upload className="w-5 h-5 text-gray-600 hover:text-gray-800" />
              <input
                type="file"
                accept=".js"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
          <button
            onClick={handleCopy}
            className="p-1 hover:text-gray-800"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5" />
          </button>
          {readOnly && (
            <button
              onClick={handleDownload}
              className="p-1 hover:text-gray-800"
              title="Download file"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="w-full h-[400px] p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        spellCheck={false}
      />
    </div>
  );
};