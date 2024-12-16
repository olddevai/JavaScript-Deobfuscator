import { CodeIssue } from '../../types/deobfuscator';

export const findIssues = (code: string): CodeIssue[] => {
  const issues: CodeIssue[] = [];

  // Check for eval usage
  if (code.includes('eval(')) {
    issues.push({
      type: 'warning',
      message: 'Use of eval detected - potential security risk',
    });
  }

  // Check for with statement
  if (code.includes('with(')) {
    issues.push({
      type: 'warning',
      message: 'Use of with statement detected - not recommended',
    });
  }

  // Check for dynamic function creation
  if (code.match(/new\s+Function/)) {
    issues.push({
      type: 'warning',
      message: 'Dynamic function creation detected - potential security risk',
    });
  }

  // Check for debugger statements
  if (code.includes('debugger')) {
    issues.push({
      type: 'warning',
      message: 'Debugger statement found - should be removed in production',
    });
  }

  // Check for console.log statements
  if (code.match(/console\.(log|debug|info)/)) {
    issues.push({
      type: 'warning',
      message: 'Console logging detected - should be removed in production',
    });
  }

  return issues;
};