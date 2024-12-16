import React from 'react';
import { CodeAnalysis } from '../types/deobfuscator';
import { AlertTriangle, BarChart2 } from 'lucide-react';

interface CodeAnalysisProps {
  analysis: CodeAnalysis;
}

export const CodeAnalysisPanel: React.FC<CodeAnalysisProps> = ({ analysis }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5" />
        Code Analysis
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Lines of Code</div>
          <div className="text-xl font-semibold">{analysis.metrics.lines}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Functions</div>
          <div className="text-xl font-semibold">{analysis.metrics.functions}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Variables</div>
          <div className="text-xl font-semibold">{analysis.metrics.variables}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Complexity Score</div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{
              width: `${Math.min(100, (analysis.complexity / 50) * 100)}%`,
            }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {analysis.complexity.toFixed(1)} / 50
        </div>
      </div>

      {analysis.issues.length > 0 && (
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Potential Issues
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {analysis.issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};