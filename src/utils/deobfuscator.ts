import { DeobfuscationOptions, CodeAnalysis } from '../types/deobfuscator';

export const deobfuscateCode = (
  code: string,
  options: DeobfuscationOptions
): string => {
  let result = code;

  if (options.convertUnicode) {
    result = convertUnicodeSequences(result);
  }

  if (options.convertNumbers) {
    result = convertNumberFormats(result);
  }

  if (options.decodeStrings) {
    result = decodeStringLiterals(result);
  }

  if (options.simplifyNotation) {
    result = simplifyNotation(result);
  }

  if (options.beautifyNames) {
    result = beautifyIdentifiers(result);
  }

  if (options.removeDeadCode) {
    result = removeDeadCode(result);
  }

  if (options.extractEval) {
    result = extractEvalContent(result);
  }

  if (options.formatCode) {
    result = formatCode(result);
  }

  return result;
};

const convertUnicodeSequences = (code: string): string => {
  return code.replace(/\\u[\dA-F]{4}/gi, match =>
    String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
  );
};

const convertNumberFormats = (code: string): string => {
  return code
    .replace(/0x[\da-f]+/gi, match => parseInt(match, 16).toString())
    .replace(/0o[0-7]+/gi, match => parseInt(match, 8).toString());
};

const decodeStringLiterals = (code: string): string => {
  // Basic string concatenation simplification
  return code.replace(/['"][\s+]*\+[\s+]*['"]/g, '');
};

const simplifyNotation = (code: string): string => {
  // Convert bracket notation to dot notation where possible
  return code.replace(/\[["'](\w+)["']\]/g, '.$1');
};

const beautifyIdentifiers = (code: string): string => {
  // Simple variable name beautification
  let counter = 0;
  const identifierMap = new Map();
  
  return code.replace(/\b_[\d\w]+\b/g, match => {
    if (!identifierMap.has(match)) {
      identifierMap.set(match, `var_${counter++}`);
    }
    return identifierMap.get(match);
  });
};

const removeDeadCode = (code: string): string => {
  // Basic dead code removal
  return code
    .replace(/if\s*\(false\)\s*{[^}]*}/g, '')
    .replace(/if\s*\(true\)\s*{([^}]*)}\s*else\s*{[^}]*}/g, '$1');
};

const extractEvalContent = (code: string): string => {
  // Basic eval content extraction
  return code.replace(/eval\((["'])(.*?)\1\)/g, '$2');
};

const formatCode = (code: string): string => {
  // Basic code formatting
  let indent = 0;
  const lines = code.split('\n');
  
  return lines
    .map(line => {
      line = line.trim();
      if (line.includes('}')) indent--;
      const formatted = '  '.repeat(Math.max(0, indent)) + line;
      if (line.includes('{')) indent++;
      return formatted;
    })
    .join('\n');
};

export const analyzeCode = (code: string): CodeAnalysis => {
  return {
    complexity: calculateComplexity(code),
    issues: findPotentialIssues(code),
    metrics: {
      lines: code.split('\n').length,
      functions: (code.match(/function/g) || []).length,
      variables: (code.match(/var|let|const/g) || []).length,
    },
  };
};

const calculateComplexity = (code: string): number => {
  const controlStructures = (code.match(/if|for|while|switch|catch/g) || []).length;
  const operators = (code.match(/[-!$%^&*()+|~=`{}\[\]:";'<>?,.\/]/g) || []).length;
  return controlStructures + operators / 10;
};

const findPotentialIssues = (code: string): string[] => {
  const issues: string[] = [];
  
  if (code.includes('eval(')) {
    issues.push('Use of eval detected - potential security risk');
  }
  
  if (code.includes('with(')) {
    issues.push('Use of with statement detected - not recommended');
  }
  
  if (code.match(/var\s+[a-z_]\w*\s*=\s*new\s+Function/)) {
    issues.push('Dynamic function creation detected - potential security risk');
  }
  
  return issues;
};