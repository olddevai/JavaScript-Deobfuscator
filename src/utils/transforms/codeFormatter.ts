import { createTransform } from './transformUtils';

export const formatCode = createTransform((code: string) => {
  const INDENT = '  ';
  let indent = 0;
  let result = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    
    // Handle strings
    if ((char === '"' || char === "'") && code[i - 1] !== '\\') {
      if (inString && char === stringChar) {
        inString = false;
      } else if (!inString) {
        inString = true;
        stringChar = char;
      }
    }
    
    if (!inString) {
      // Handle indentation
      if (char === '{') {
        result += char + '\n' + INDENT.repeat(++indent);
      } else if (char === '}') {
        result = result.trimEnd() + '\n' + INDENT.repeat(--indent) + char;
        if (i < code.length - 1) result += '\n' + INDENT.repeat(indent);
      } else if (char === ';') {
        result += char + '\n' + INDENT.repeat(indent);
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }
  
  return result;
});