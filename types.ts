export type Operation = '+' | '-' | '*' | '/'

export type ButtonType = 'number' | 'operation' | 'equals' | 'clear' | 'delete' | 'decimal'

export interface CalculatorState {
  display: string
  previousValue: string
  operation: Operation | null
  waitingForNewValue: boolean
  hasError: boolean
}