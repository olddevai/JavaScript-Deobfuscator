import { createTransform } from './transformUtils';

export const decodeStrings = createTransform((code: string) => {
  // Handle string concatenation
  code = code.replace(/(['"])\s*\+\s*\1/g, '');
  
  // Handle hex string literals
  code = code.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => 
    String.fromCharCode(parseInt(hex, 16))
  );
  
  // Handle unicode escapes
  code = code.replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  
  return code;
});