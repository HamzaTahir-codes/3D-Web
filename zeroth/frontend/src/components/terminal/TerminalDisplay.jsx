import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const lineColors = {
  system: '#444',
  prompt: '#1d9e75',
  input: '#ffffff',
  success: '#1d9e75',
  error: '#e24b4a',
  divider: '#222',
}

function TerminalLine({ line, index }) {
  if (line.type === 'divider') {
    return (
      <div style={{
        borderTop: '1px solid #1a1a1a',
        margin: '8px 0',
      }} />
    )
  }
  if (line.type === 'spacer') {
    return <div style={{ height: '6px' }} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '3px',
        alignItems: 'flex-start',
      }}
    >
      {line.label && (
        <span style={{
          color: '#4f46e5',
          flexShrink: 0,
          fontSize: '13px',
        }}>
          {line.label}
        </span>
      )}
      <span style={{
        color: lineColors[line.type] || '#aaa',
        fontSize: '13px',
        lineHeight: '1.6',
        wordBreak: 'break-word',
      }}>
        {line.text}
      </span>
    </motion.div>
  )
}

export default function TerminalDisplay({ history }) {
  const containerRef = useRef()

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight
    }
  }, [history])

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#222 transparent',
      }}>
      {history.map((line, i) => (
        <TerminalLine key={i} line={line} index={i} />
      ))}
    </div>
  )
}
