export interface Validator {
  id?: string;
  isHidden: boolean;
  input?: {
    stdin: string[];
  };
  expected?: {
    stdout: string[];
  };
  weight: number;
}
