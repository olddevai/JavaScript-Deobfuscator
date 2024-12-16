import { createTransform } from './transformUtils';

const generateReadableName = (prefix: string, index: number): string => {
  const baseChars = 'abcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(index / baseChars.length);
  const char = baseChars[index % baseChars.length];
  return `${prefix}_${char}${length > 0 ? length : ''}`;
};

export const beautifyNames = createTransform((code: string) => {
  const identifierMap = new Map<string, string>();
  let varCounter = 0;
  let funcCounter = 0;

  return code
    .replace(/\b_[\d\w]+\b/g, (match) => {
      if (!identifierMap.has(match)) {
        identifierMap.set(
          match,
          generateReadableName('var', varCounter++)
        );
      }
      return identifierMap.get(match) || match;
    })
    .replace(/\bfunction\s+_[\d\w]+\b/g, (match) => {
      const funcName = match.split(/\s+/)[1];
      if (!identifierMap.has(funcName)) {
        identifierMap.set(
          funcName,
          generateReadableName('func', funcCounter++)
        );
      }
      return `function ${identifierMap.get(funcName) || funcName}`;
    });
});