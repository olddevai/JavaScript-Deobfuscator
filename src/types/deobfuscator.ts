export interface DeobfuscationOptions {
  beautifyNames: boolean;
  decodeStrings: boolean;
  reconstructFlow: boolean;
  removeDeadCode: boolean;
  simplifyNotation: boolean;
  extractEval: boolean;
  convertUnicode: boolean;
  convertNumbers: boolean;
  formatCode: boolean;
}

export interface CodeAnalysis {
  complexity: number;
  issues: string[];
  metrics: {
    lines: number;
    functions: number;
    variables: number;
  };
}

export interface DeobfuscationHistory {
  id: string;
  timestamp: Date;
  originalCode: string;
  deobfuscatedCode: string;
  options: DeobfuscationOptions;
}