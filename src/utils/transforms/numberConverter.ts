import { createTransform } from './transformUtils';

export const convertNumbers = createTransform((code: string) => {
  // Convert hexadecimal numbers
  code = code.replace(/0x[\da-f]+/gi, match => 
    parseInt(match, 16).toString()
  );
  
  // Convert octal numbers
  code = code.replace(/0o[0-7]+/gi, match => 
    parseInt(match, 8).toString()
  );
  
  // Convert binary numbers
  code = code.replace(/0b[01]+/gi, match => 
    parseInt(match, 2).toString()
  );
  
  return code;
});