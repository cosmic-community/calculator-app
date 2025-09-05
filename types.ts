export type Operation = '+' | '-' | '*' | '/'

export type ScientificOperation = 
  | 'sin' | 'cos' | 'tan' 
  | 'asin' | 'acos' | 'atan'
  | 'sinh' | 'cosh' | 'tanh'
  | 'log' | 'ln' | 'log2'
  | 'exp' | 'exp2' | 'exp10'
  | 'sqrt' | 'cbrt' | 'pow'
  | 'factorial' | 'abs' | 'floor' | 'ceil'
  | 'round' | 'random' | 'pi' | 'e'

export type ButtonType = 
  | 'number' | 'operation' | 'equals' | 'clear' | 'delete' | 'decimal'
  | 'scientific' | 'constant' | 'function' | 'mode'

export interface CalculatorState {
  display: string
  previousValue: string
  operation: Operation | null
  waitingForNewValue: boolean
  hasError: boolean
  isScientificMode: boolean
  angleMode: 'deg' | 'rad'
  memory: number
}

export interface CalculatorMode {
  isScientific: boolean
  isDegrees: boolean
}