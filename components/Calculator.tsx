'use client'

import { useState, useEffect, useCallback } from 'react'
import { CalculatorState, Operation, ButtonType, ScientificOperation } from '@/types'

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: '',
    operation: null,
    waitingForNewValue: false,
    hasError: false,
    isScientificMode: false,
    angleMode: 'deg',
    memory: 0
  })

  const toRadians = useCallback((degrees: number): number => {
    return degrees * (Math.PI / 180)
  }, [])

  const toDegrees = useCallback((radians: number): number => {
    return radians * (180 / Math.PI)
  }, [])

  const factorial = useCallback((n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN
    if (n === 0 || n === 1) return 1
    if (n > 170) return Infinity // Prevent overflow
    
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }, [])

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

  const calculateScientific = useCallback((value: string, operation: ScientificOperation): string => {
    const num = parseFloat(value)
    
    if (isNaN(num) && !['pi', 'e', 'random'].includes(operation)) return 'Error'

    try {
      switch (operation) {
        // Trigonometric functions
        case 'sin':
          return Math.sin(state.angleMode === 'deg' ? toRadians(num) : num).toString()
        case 'cos':
          return Math.cos(state.angleMode === 'deg' ? toRadians(num) : num).toString()
        case 'tan':
          return Math.tan(state.angleMode === 'deg' ? toRadians(num) : num).toString()
        
        // Inverse trigonometric functions
        case 'asin':
          const asinResult = Math.asin(num)
          return (state.angleMode === 'deg' ? toDegrees(asinResult) : asinResult).toString()
        case 'acos':
          const acosResult = Math.acos(num)
          return (state.angleMode === 'deg' ? toDegrees(acosResult) : acosResult).toString()
        case 'atan':
          const atanResult = Math.atan(num)
          return (state.angleMode === 'deg' ? toDegrees(atanResult) : atanResult).toString()
        
        // Hyperbolic functions
        case 'sinh':
          return Math.sinh(num).toString()
        case 'cosh':
          return Math.cosh(num).toString()
        case 'tanh':
          return Math.tanh(num).toString()
        
        // Logarithmic functions
        case 'log':
          return Math.log10(num).toString()
        case 'ln':
          return Math.log(num).toString()
        case 'log2':
          return Math.log2(num).toString()
        
        // Exponential functions
        case 'exp':
          return Math.exp(num).toString()
        case 'exp2':
          return Math.pow(2, num).toString()
        case 'exp10':
          return Math.pow(10, num).toString()
        
        // Root functions
        case 'sqrt':
          return Math.sqrt(num).toString()
        case 'cbrt':
          return Math.cbrt(num).toString()
        
        // Other mathematical functions
        case 'factorial':
          return factorial(num).toString()
        case 'abs':
          return Math.abs(num).toString()
        case 'floor':
          return Math.floor(num).toString()
        case 'ceil':
          return Math.ceil(num).toString()
        case 'round':
          return Math.round(num).toString()
        
        // Constants
        case 'pi':
          return Math.PI.toString()
        case 'e':
          return Math.E.toString()
        case 'random':
          return Math.random().toString()
        
        default:
          return value
      }
    } catch (error) {
      return 'Error'
    }
  }, [state.angleMode, toRadians, toDegrees, factorial])

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

  const handleScientificOperation = useCallback((op: ScientificOperation) => {
    setState(prev => {
      if (prev.hasError && !['pi', 'e', 'random'].includes(op)) return prev
      
      const result = calculateScientific(prev.display, op)
      return {
        ...prev,
        display: result,
        waitingForNewValue: true,
        hasError: result === 'Error' || result === 'NaN' || result === 'Infinity'
      }
    })
  }, [calculateScientific])

  const handleEquals = useCallback(() => {
    setState(prev => {
      if (prev.hasError || !prev.operation || !prev.previousValue) return prev
      
      const result = calculate(prev.previousValue, prev.display, prev.operation)
      return {
        ...prev,
        display: result,
        previousValue: '',
        operation: null,
        waitingForNewValue: true,
        hasError: result === 'Error'
      }
    })
  }, [calculate])

  const handleClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: '0',
      previousValue: '',
      operation: null,
      waitingForNewValue: false,
      hasError: false
    }))
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

  const toggleMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isScientificMode: !prev.isScientificMode
    }))
  }, [])

  const toggleAngleMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      angleMode: prev.angleMode === 'deg' ? 'rad' : 'deg'
    }))
  }, [])

  const handleMemoryStore = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: parseFloat(prev.display) || 0
    }))
  }, [])

  const handleMemoryRecall = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.memory.toString(),
      waitingForNewValue: true
    }))
  }, [])

  const handleMemoryClear = useCallback(() => {
    setState(prev => ({
      ...prev,
      memory: 0
    }))
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
    } else if (value === 'MODE') {
      toggleMode()
    } else if (value === 'DEG/RAD') {
      toggleAngleMode()
    } else if (value === 'MS') {
      handleMemoryStore()
    } else if (value === 'MR') {
      handleMemoryRecall()
    } else if (value === 'MC') {
      handleMemoryClear()
    } else {
      // Handle scientific operations
      handleScientificOperation(value as ScientificOperation)
    }
  }, [
    handleNumber, handleOperation, handleEquals, handleClear, 
    handleDelete, handleDecimal, toggleMode, toggleAngleMode,
    handleMemoryStore, handleMemoryRecall, handleMemoryClear,
    handleScientificOperation
  ])

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
      } else if (key.toLowerCase() === 'm') {
        toggleMode()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleNumber, handleOperation, handleEquals, handleClear, handleDelete, handleDecimal, toggleMode])

  const CalcButton = ({ value, onClick, type, className = '', displayValue }: {
    value: string
    onClick: (value: string) => void
    type: ButtonType
    className?: string
    displayValue?: string
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
        case 'scientific':
          return 'calc-button-scientific'
        case 'constant':
          return 'calc-button-constant'
        case 'function':
          return 'calc-button-function'
        case 'mode':
          return 'calc-button-mode'
        default:
          return 'calc-button-number'
      }
    }

    const getAriaLabel = () => {
      switch (type) {
        case 'operation':
          return `Operation ${value}`
        case 'equals':
          return 'Equals'
        case 'clear':
          return 'Clear all'
        case 'delete':
          return 'Delete'
        case 'scientific':
          return `Scientific function ${value}`
        case 'constant':
          return `Constant ${value}`
        case 'function':
          return `Function ${value}`
        case 'mode':
          return `Mode ${value}`
        default:
          return `Number ${value}`
      }
    }

    return (
      <button
        className={`${getButtonClass()} ${className}`}
        onClick={() => onClick(value)}
        aria-label={getAriaLabel()}
      >
        {displayValue || (value === '*' ? '×' : value === '/' ? '÷' : value)}
      </button>
    )
  }

  return (
    <div className={`bg-calc-dark rounded-2xl shadow-calc p-6 border border-gray-700 transition-all duration-300 ${
      state.isScientificMode ? 'max-w-6xl' : 'max-w-md'
    }`}>
      {/* Display */}
      <div className="bg-calc-darker rounded-xl p-6 mb-6 border border-gray-600">
        <div className="text-right">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2 text-xs">
              <span className={`px-2 py-1 rounded ${state.angleMode === 'deg' ? 'bg-calc-accent text-white' : 'bg-gray-600 text-gray-300'}`}>
                DEG
              </span>
              <span className={`px-2 py-1 rounded ${state.angleMode === 'rad' ? 'bg-calc-accent text-white' : 'bg-gray-600 text-gray-300'}`}>
                RAD
              </span>
              {state.memory !== 0 && (
                <span className="px-2 py-1 rounded bg-green-600 text-white">M</span>
              )}
            </div>
            <span className={`px-2 py-1 rounded text-xs ${state.isScientificMode ? 'bg-calc-accent text-white' : 'bg-gray-600 text-gray-300'}`}>
              SCI
            </span>
          </div>
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
      <div className={`grid gap-3 ${state.isScientificMode ? 'grid-cols-8' : 'grid-cols-4'}`}>
        
        {state.isScientificMode && (
          <>
            {/* Scientific functions - First row */}
            <CalcButton value="sin" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="cos" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="tan" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="ln" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="log" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="sqrt" onClick={handleButtonClick} type="scientific" displayValue="√x" />
            <CalcButton value="pow" onClick={handleButtonClick} type="scientific" displayValue="x²" />
            <CalcButton value="factorial" onClick={handleButtonClick} type="scientific" displayValue="x!" />

            {/* Scientific functions - Second row */}
            <CalcButton value="asin" onClick={handleButtonClick} type="scientific" displayValue="sin⁻¹" />
            <CalcButton value="acos" onClick={handleButtonClick} type="scientific" displayValue="cos⁻¹" />
            <CalcButton value="atan" onClick={handleButtonClick} type="scientific" displayValue="tan⁻¹" />
            <CalcButton value="exp" onClick={handleButtonClick} type="scientific" displayValue="eˣ" />
            <CalcButton value="exp10" onClick={handleButtonClick} type="scientific" displayValue="10ˣ" />
            <CalcButton value="cbrt" onClick={handleButtonClick} type="scientific" displayValue="∛x" />
            <CalcButton value="abs" onClick={handleButtonClick} type="scientific" displayValue="|x|" />
            <CalcButton value="random" onClick={handleButtonClick} type="function" displayValue="RND" />

            {/* Scientific functions - Third row */}
            <CalcButton value="sinh" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="cosh" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="tanh" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="log2" onClick={handleButtonClick} type="scientific" />
            <CalcButton value="pi" onClick={handleButtonClick} type="constant" displayValue="π" />
            <CalcButton value="e" onClick={handleButtonClick} type="constant" />
            <CalcButton value="floor" onClick={handleButtonClick} type="function" displayValue="⌊x⌋" />
            <CalcButton value="ceil" onClick={handleButtonClick} type="function" displayValue="⌈x⌉" />

            {/* Memory and mode functions */}
            <CalcButton value="MS" onClick={handleButtonClick} type="mode" />
            <CalcButton value="MR" onClick={handleButtonClick} type="mode" />
            <CalcButton value="MC" onClick={handleButtonClick} type="mode" />
            <CalcButton value="DEG/RAD" onClick={handleButtonClick} type="mode" displayValue={state.angleMode.toUpperCase()} />
          </>
        )}

        {/* Main calculator buttons */}
        <CalcButton value="MODE" onClick={handleButtonClick} type="mode" className={state.isScientificMode ? "" : "col-span-1"} />
        <CalcButton value="AC" onClick={handleButtonClick} type="clear" className={state.isScientificMode ? "" : "col-span-2"} />
        <CalcButton value="DEL" onClick={handleButtonClick} type="delete" />
        <CalcButton value="/" onClick={handleButtonClick} type="operation" />

        {/* Numbers and operations */}
        <CalcButton value="7" onClick={handleButtonClick} type="number" />
        <CalcButton value="8" onClick={handleButtonClick} type="number" />
        <CalcButton value="9" onClick={handleButtonClick} type="number" />
        <CalcButton value="*" onClick={handleButtonClick} type="operation" />

        <CalcButton value="4" onClick={handleButtonClick} type="number" />
        <CalcButton value="5" onClick={handleButtonClick} type="number" />
        <CalcButton value="6" onClick={handleButtonClick} type="number" />
        <CalcButton value="-" onClick={handleButtonClick} type="operation" />

        <CalcButton value="1" onClick={handleButtonClick} type="number" />
        <CalcButton value="2" onClick={handleButtonClick} type="number" />
        <CalcButton value="3" onClick={handleButtonClick} type="number" />
        <CalcButton value="+" onClick={handleButtonClick} type="operation" />

        <CalcButton value="0" onClick={handleButtonClick} type="number" className={state.isScientificMode ? "" : "col-span-2"} />
        {!state.isScientificMode && <CalcButton value="." onClick={handleButtonClick} type="decimal" />}
        {state.isScientificMode && <CalcButton value="." onClick={handleButtonClick} type="decimal" />}
        <CalcButton value="=" onClick={handleButtonClick} type="equals" />
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-gray-400 text-xs">
        {state.isScientificMode ? (
          <>MODE to toggle • M for mode • ESC to clear • Angle mode: {state.angleMode.toUpperCase()}</>
        ) : (
          <>Use keyboard or touch • MODE for scientific • ESC to clear • Backspace to delete</>
        )}
      </div>
    </div>
  )
}

export default Calculator