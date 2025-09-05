export type Operation = '+' | '-' | '*' | '/' | null;

export interface CalculatorState {
  display: string;
  previousValue: string;
  operation: Operation;
  waitingForNewValue: boolean;
  hasError: boolean;
}

export type ButtonType = 'number' | 'operation' | 'equals' | 'clear' | 'delete' | 'decimal';

export interface CalcButtonProps {
  value: string;
  onClick: (value: string) => void;
  type: ButtonType;
  className?: string;
}