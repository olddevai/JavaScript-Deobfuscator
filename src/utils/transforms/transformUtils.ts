export type Transform = (code: string) => string;

export interface TransformResult {
  code: string;
  errors: string[];
  warnings: string[];
}

export const createTransform = (
  transform: Transform
): Transform => {
  return (code: string): string => {
    try {
      return transform(code);
    } catch (error) {
      console.error(`Transform error: ${error}`);
      return code;
    }
  };
};