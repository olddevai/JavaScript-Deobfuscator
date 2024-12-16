import { createTransform } from './transformUtils';

export const simplifyNotation = createTransform((code: string) => {
  // Convert bracket notation to dot notation where possible
  code = code.replace(/\[["'](\w+)["']\]/g, '.$1');
  
  // Simplify object literals
  code = code.replace(/{\s*["'](\w+)["']\s*:/g, '{$1:');
  
  // Simplify array access
  code = code.replace(/\[(0|[1-9]\d*)\]/g, (_, num) => 
    `.${num}`
  );
  
  return code;
});