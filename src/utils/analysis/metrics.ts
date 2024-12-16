import { CodeMetrics } from '../../types/deobfuscator';

export const calculateMetrics = (code: string): CodeMetrics => {
  return {
    lines: countLines(code),
    functions: countFunctions(code),
    variables: countVariables(code),
    complexity: calculateComplexity(code),
  };
};

const countLines = (code: string): number => {
  return code.split('\n').filter(line => line.trim()).length;
};

const countFunctions = (code: string): number => {
  const functionMatches = code.match(
    /function\s+\w+|const\s+\w+\s*=\s*function|const\s+\w+\s*=\s*\(.*?\)\s*=>/g
  );
  return functionMatches ? functionMatches.length : 0;
};

const countVariables = (code: string): number => {
  const varMatches = code.match(/\b(var|let|const)\s+\w+/g);
  return varMatches ? varMatches.length : 0;
};

const calculateComplexity = (code: string): number => {
  let complexity = 0;
  
  // Control structures
  const controlStructures = (code.match(
    /if|else|for|while|do|switch|case|catch|try|throw|return|break|continue/g
  ) || []).length;
  
  // Logical operators
  const logicalOperators = (code.match(/&&|\|\||!|[?:]/g) || []).length;
  
  // Function declarations
  const functions = (code.match(/function|\=>/g) || []).length;
  
  complexity = controlStructures + (logicalOperators * 0.5) + functions;
  
  return Math.round(complexity * 10) / 10;
};