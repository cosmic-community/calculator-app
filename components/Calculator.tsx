'use client'

import { useState, useEffect, useCallback } from 'react'
import { CalculatorState, Operation, ButtonType } from '@/types'

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: '',
    operation: null,
    waitingForNewValue: false,
    hasError: false
  })

  const calculate = useCallback((prev: string, current: string, operation: Operation): string => {
    const prevNum = parseFloat(prev)
    const currentNum = parseFloat(current)
    
    if (isNaN(prevNum) || isNaN(currentNum)) return current

    switch (operation) {
      case '+':
        return (prevNum + currentNum).toString()
      case '-':
        return (prevNum - currentNum).toString()
      case '*':
        return (prevNum * currentNum).toString()
      case '/':
        if (currentNum === 0) return 'Error'
        return (prevNum / currentNum).toString()
      default:
        return current
    }
  }, [])

  const handleNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.hasError) {
        return {
          ...prev,
          display: num,
          hasError: false,
          waitingForNewValue: false
        }
      }
      
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false
        }
      }
      
      if (prev.display === '0') {
        return { ...prev, display: num }
      }
      
      return {
        ...prev,
        display: prev.display + num
      }
    })
  }, [])

  const handleOperation = useCallback((op: Operation) => {
    setState(prev => {
      if (prev.hasError) return prev
      
      if (prev.previousValue && prev.operation && !prev.waitingForNewValue) {
        const result = calculate(prev.previousValue, prev.display, prev.operation)
        return {
          ...prev,
          display: result,
          previousValue: result,
          operation: op,
          waitingForNewValue: true,
          hasError: result === 'Error'
        }
      }
      
      return {
        ...prev,
        previousValue: prev.display,
        operation: op,
        waitingForNewValue: true
      }
    })
  }, [calculate])

  const handleEquals = useCallback(() => {
    setState(prev => {
      if (prev.hasError || !prev.operation || !prev.previousValue) return prev
      
      const result = calculate(prev.previousValue, prev.display, prev.operation)
      return {
        display: result,
        previousValue: '',
        operation: null,
        waitingForNewValue: true,
        hasError: result === 'Error'
      }
    })
  }, [calculate])

  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: '',
      operation: null,
      waitingForNewValue: false,
      hasError: false
    })
  }, [])

  const handleDelete = useCallback(() => {
    setState(prev => {
      if (prev.hasError || prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0',
          hasError: false,
          waitingForNewValue: false
        }
      }
      
      const newDisplay = prev.display.slice(0, -1)
      return {
        ...prev,
        display: newDisplay === '' ? '0' : newDisplay
      }
    })
  }, [])

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.hasError) return prev
      
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0.',
          waitingForNewValue: false
        }
      }
      
      if (!prev.display.includes('.')) {
        return {
          ...prev,
          display: prev.display + '.'
        }
      }
      
      return prev
    })
  }, [])

  const handleButtonClick = useCallback((value: string) => {
    if (value >= '0' && value <= '9') {
      handleNumber(value)
    } else if (['+', '-', '*', '/'].includes(value)) {
      handleOperation(value as Operation)
    } else if (value === '=') {
      handleEquals()
    } else if (value === 'AC') {
      handleClear()
    } else if (value === 'DEL') {
      handleDelete()
    } else if (value === '.') {
      handleDecimal()
    }
  }, [handleNumber, handleOperation, handleEquals, handleClear, handleDelete, handleDecimal])

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault()
      
      const { key } = event
      
      if (key >= '0' && key <= '9') {
        handleNumber(key)
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperation(key as Operation)
      } else if (key === 'Enter' || key === '=') {
        handleEquals()
      } else if (key === 'Escape') {
        handleClear()
      } else if (key === 'Backspace') {
        handleDelete()
      } else if (key === '.') {
        handleDecimal()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleNumber, handleOperation, handleEquals, handleClear, handleDelete, handleDecimal])

  const CalcButton = ({ value, onClick, type, className = '' }: {
    value: string
    onClick: (value: string) => void
    type: ButtonType
    className?: string
  }) => {
    const getButtonClass = () => {
      switch (type) {
        case 'number':
        case 'decimal':
          return 'calc-button-number'
        case 'operation':
          return 'calc-button-operation'
        case 'equals':
          return 'calc-button-equals'
        case 'clear':
          return 'calc-button-clear'
        case 'delete':
          return 'calc-button-delete'
        default:
          return 'calc-button-number'
      }
    }

    return (
      <button
        className={`${getButtonClass()} ${className}`}
        onClick={() => onClick(value)}
        aria-label={`${type === 'operation' ? 'Operation' : type === 'equals' ? 'Equals' : type === 'clear' ? 'Clear all' : type === 'delete' ? 'Delete' : 'Number'} ${value}`}
      >
        {value === '*' ? '×' : value === '/' ? '÷' : value}
      </button>
    )
  }

  return (
    <div className="bg-calc-dark rounded-2xl shadow-calc p-6 border border-gray-700">
      {/* Display */}
      <div className="bg-calc-darker rounded-xl p-6 mb-6 border border-gray-600">
        <div className="text-right">
          <div className="text-gray-400 text-sm h-6">
            {state.previousValue && state.operation && (
              <>
                {state.previousValue} {state.operation === '*' ? '×' : state.operation === '/' ? '÷' : state.operation}
              </>
            )}
          </div>
          <div className="text-white text-3xl font-mono font-bold truncate">
            {state.display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalcButton value="AC" onClick={handleButtonClick} type="clear" className="col-span-2" />
        <CalcButton value="DEL" onClick={handleButtonClick} type="delete" />
        <CalcButton value="/" onClick={handleButtonClick} type="operation" />

        {/* Row 2 */}
        <CalcButton value="7" onClick={handleButtonClick} type="number" />
        <CalcButton value="8" onClick={handleButtonClick} type="number" />
        <CalcButton value="9" onClick={handleButtonClick} type="number" />
        <CalcButton value="*" onClick={handleButtonClick} type="operation" />

        {/* Row 3 */}
        <CalcButton value="4" onClick={handleButtonClick} type="number" />
        <CalcButton value="5" onClick={handleButtonClick} type="number" />
        <CalcButton value="6" onClick={handleButtonClick} type="number" />
        <CalcButton value="-" onClick={handleButtonClick} type="operation" />

        {/* Row 4 */}
        <CalcButton value="1" onClick={handleButtonClick} type="number" />
        <CalcButton value="2" onClick={handleButtonClick} type="number" />
        <CalcButton value="3" onClick={handleButtonClick} type="number" />
        <CalcButton value="+" onClick={handleButtonClick} type="operation" />

        {/* Row 5 */}
        <CalcButton value="0" onClick={handleButtonClick} type="number" className="col-span-2" />
        <CalcButton value="." onClick={handleButtonClick} type="decimal" />
        <CalcButton value="=" onClick={handleButtonClick} type="equals" />
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-gray-400 text-xs">
        Use keyboard or touch for input • ESC to clear • Backspace to delete
      </div>
    </div>
  )
}

export default Calculator