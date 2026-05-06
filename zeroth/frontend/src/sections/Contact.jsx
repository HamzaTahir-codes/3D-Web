import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionTransition from '../components/ui/SectionTransition'
import TerminalDisplay from '../components/terminal/TerminalDisplay'
import TerminalInput from '../components/terminal/TerminalInput'
import { useTerminal } from '../hooks/useTerminal'
import { getResumeUrl } from '../api'

export default function Contact() {
  const {
    history,
    currentInput,
    setCurrentInput,
    currentStep,
    error,
    status,
    isDone,
    handleKeyDown,
    handleSubmit,
  } = useTerminal()

  return (
    <SectionTransition id="contact">
      <div
        id="contact"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          background: '#000000',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* CSS starfield */}
        <div className="starfield" />

        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '760px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>

          {/* Header */}
          <div style={{ fontFamily: 'monospace' }}>
            <div style={{
              fontSize: '10px',
              color: '#333',
              letterSpacing: '0.25em',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}>
              — zeroth —
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '500',
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              Contact
            </div>
            <div style={{
              fontSize: '12px',
              color: '#444',
              letterSpacing: '0.1em',
            }}>
              use the terminal below — or reach out directly.
            </div>
          </div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: '#080810',
              border: '1px solid #1a1a2e',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Terminal title bar */}
            <div style={{
              background: '#0d0d1a',
              borderBottom: '1px solid #1a1a2e',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%', background: '#e24b4a',
              }} />
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%', background: '#ef9f27',
              }} />
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%', background: '#1d9e75',
              }} />
              <span style={{
                marginLeft: '8px',
                fontSize: '11px',
                color: '#333',
                fontFamily: 'monospace',
              }}>
                zeroth — contact
              </span>
            </div>

            <TerminalDisplay history={history} />
            <TerminalInput
              currentStep={currentStep}
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              onKeyDown={handleKeyDown}
              onSubmit={handleSubmit}
              isDone={isDone}
              error={error}
            />
          </motion.div>

          {/* Direct links */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            fontFamily: 'monospace',
          }}>
            <a
              href="mailto:m.hamza.codes@gmail.com"
              style={{
                fontSize: '12px',
                color: '#555',
                textDecoration: 'none',
                border: '1px solid #1a1a1a',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'color 0.2s',
              }}
            >
              → m.hamza.codes@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/m-hamza-tahir-dev-eng/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: '#555',
                textDecoration: 'none',
                border: '1px solid #1a1a1a',
                padding: '8px 16px',
                borderRadius: '6px',
              }}
            >
              → LinkedIn
            </a>
            <a
              href={getResumeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: '#4f46e5',
                textDecoration: 'none',
                border: '1px solid #4f46e5',
                padding: '8px 16px',
                borderRadius: '6px',
              }}
            >
              ↓ Download Resume
            </a>
          </div>

        </div>
      </div>
    </SectionTransition>
  )
}
