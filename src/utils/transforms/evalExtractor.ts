import { createTransform } from './transformUtils';

export const extractEvalContent = createTransform((code: string) => {
  // Extract direct eval calls
  code = code.replace(/eval\((["'])(.*?)\1\)/g, '$2');
  
  // Handle nested eval calls
  while (code.includes('eval(')) {
    code = code.replace(/eval\((["'])(.*?)\1\)/g, '$2');
  }
  
  return code;
});