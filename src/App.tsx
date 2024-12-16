import React, { useState, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { OptionsPanel } from './components/OptionsPanel';
import { CodeAnalysisPanel } from './components/CodeAnalysis';
import { DeobfuscationOptions, CodeAnalysis } from './types/deobfuscator';
import { deobfuscateCode, analyzeCode } from './utils/deobfuscator';
import { Wand2 } from 'lucide-react';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [options, setOptions] = useState<DeobfuscationOptions>({
    beautifyNames: true,
    decodeStrings: true,
    reconstructFlow: true,
    removeDeadCode: true,
    simplifyNotation: true,
    extractEval: true,
    convertUnicode: true,
    convertNumbers: true,
    formatCode: true,
  });

  const handleDeobfuscate = useCallback(() => {
    if (!inputCode.trim()) return;

    setIsProcessing(true);
    try {
      const result = deobfuscateCode(inputCode, options);
      setOutputCode(result);
      setAnalysis(analyzeCode(result));
    } catch (error) {
      console.error('Deobfuscation error:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  }, [inputCode, options]);

  const handleReset = () => {
    setInputCode('');
    setOutputCode('');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Wand2 className="w-8 h-8" />
            JavaScript Deobfuscator
          </h1>
          <p className="text-gray-600">
            Transform obfuscated JavaScript code into clean, readable code
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CodeEditor
                code={inputCode}
                onChange={setInputCode}
                label="Input Code"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CodeEditor
                code={outputCode}
                onChange={setOutputCode}
                readOnly
                label="Output Code"
              />
            </div>
          </div>

          <div className="space-y-6">
            <OptionsPanel options={options} onChange={setOptions} />
            
            <div className="flex gap-4">
              <button
                onClick={handleDeobfuscate}
                disabled={isProcessing || !inputCode.trim()}
                className={`flex-1 py-2 px-4 rounded-lg font-medium text-white ${
                  isProcessing || !inputCode.trim()
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Deobfuscate'}
              </button>
              
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Reset
              </button>
            </div>

            {analysis && <CodeAnalysisPanel analysis={analysis} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;