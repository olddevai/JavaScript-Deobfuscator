import { createTransform } from './transformUtils';

export const removeDeadCode = createTransform((code: string) => {
  // Remove unreachable code blocks
  code = code.replace(/if\s*\(false\)\s*{[^}]*}/g, '');
  code = code.replace(/if\s*\(true\)\s*{([^}]*)}\s*else\s*{[^}]*}/g, '$1');
  
  // Remove empty functions
  code = code.replace(/function\s+\w+\s*\(\)\s*{\s*}/g, '');
  
  // Remove unused variable declarations
  code = code.replace(/var\s+\w+\s*;(?!\s*\w+)/g, '');
  
  return code;
});