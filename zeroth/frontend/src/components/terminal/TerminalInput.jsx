import { useRef, useEffect } from 'react'

export default function TerminalInput({
  currentStep,
  currentInput,
  setCurrentInput,
  onKeyDown,
  onSubmit,
  isDone,
  error,
}) {
  const inputRef = useRef()

  useEffect(() => {
    if (!isDone) inputRef.current?.focus()
  }, [currentStep, isDone])

  if (isDone) return null

  return (
    <div style={{
      borderTop: '1px solid #1a1a1a',
      padding: '16px 24px',
      flexShrink: 0,
    }}>
      {error && (
        <div style={{
          fontSize: '11px',
          color: '#e24b4a',
          marginBottom: '10px',
          fontFamily: 'monospace',
        }}>
          ✗ {error}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}>
        <span style={{
          color: '#4f46e5',
          fontSize: '13px',
          fontFamily: 'monospace',
          paddingTop: '2px',
          flexShrink: 0,
        }}>
          visitor@zeroth:~$
        </span>

        {currentStep?.multiline ? (
          <textarea
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={currentStep?.placeholder}
            rows={3}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '13px',
              fontFamily: 'monospace',
              resize: 'none',
              lineHeight: '1.6',
              caretColor: '#1d9e75',
            }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={currentStep?.placeholder}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '13px',
              fontFamily: 'monospace',
              caretColor: '#1d9e75',
            }}
          />
        )}

        <button
          onClick={onSubmit}
          style={{
            background: 'none',
            border: '1px solid #222',
            color: '#444',
            borderRadius: '4px',
            padding: '4px 10px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '11px',
            flexShrink: 0,
          }}
        >
          enter ↵
        </button>
      </div>
    </div>
  )
}
