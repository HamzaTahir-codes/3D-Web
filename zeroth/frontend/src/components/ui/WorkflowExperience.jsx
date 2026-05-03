import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getWorkflowSteps } from '../../data/workflowSteps'

export default function WorkflowExperience({ project, onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = getWorkflowSteps(project.category)
  const step = steps[currentStep]

  const categoryColors = {
    fullstack: '#4f46e5',
    iot: '#10b981',
    mobile: '#f59e0b',
    other: '#6b7280',
  }
  const color = categoryColors[project.category] || '#6b7280'

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }
  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.96)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: '24px',
      }}
    >
      {/* Header */}
      <div style={{
        width: '100%',
        maxWidth: '760px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#444', letterSpacing: '0.15em' }}>
            HOW IT WAS BUILT
          </div>
          <div style={{ fontSize: '18px', color: '#fff', marginTop: '4px' }}>
            {project.title}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#666',
            borderRadius: '6px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          [ exit ]
        </button>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        maxWidth: '760px',
        display: 'flex',
        gap: '6px',
        marginBottom: '32px',
      }}>
        {steps.map((s, i) => (
          <div
            key={s.id}
            onClick={() => setCurrentStep(i)}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '2px',
              background: i <= currentStep ? color : '#222',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '760px',
            background: '#0a0a14',
            border: `1px solid ${color}33`,
            borderRadius: '12px',
            padding: '36px 40px',
          }}
        >
          {/* Phase label */}
          <div style={{
            fontSize: '10px',
            color: color,
            letterSpacing: '0.15em',
            marginBottom: '12px',
          }}>
            STEP {currentStep + 1} / {steps.length} — {step.phase.toUpperCase()}
          </div>

          {/* Icon + Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px',
          }}>
            <span style={{ fontSize: '36px' }}>{step.icon}</span>
            <h2 style={{
              fontSize: '22px',
              color: '#ffffff',
              fontWeight: '500',
              margin: 0,
            }}>
              {step.title}
            </h2>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: '#888',
            lineHeight: '1.8',
            marginBottom: '28px',
          }}>
            {step.description}
          </p>

          {/* Artifacts */}
          <div>
            <div style={{
              fontSize: '10px',
              color: '#333',
              letterSpacing: '0.1em',
              marginBottom: '10px',
            }}>
              DELIVERABLES
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {step.artifacts.map((a) => (
                <span
                  key={a}
                  style={{
                    fontSize: '11px',
                    padding: '4px 12px',
                    border: `1px solid ${color}55`,
                    borderRadius: '20px',
                    color: color,
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{
        width: '100%',
        maxWidth: '760px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px',
      }}>
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: currentStep === 0 ? '#333' : '#fff',
            borderRadius: '6px',
            padding: '10px 24px',
            cursor: currentStep === 0 ? 'default' : 'pointer',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}
        >
          ← prev
        </button>

        <span style={{ fontSize: '11px', color: '#333' }}>
          {steps.map((s, i) => (
            <span
              key={s.id}
              onClick={() => setCurrentStep(i)}
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i === currentStep ? color : '#222',
                margin: '0 4px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            />
          ))}
        </span>

        <button
          onClick={currentStep === steps.length - 1 ? onClose : goNext}
          style={{
            background: currentStep === steps.length - 1 ? color : 'none',
            border: `1px solid ${currentStep === steps.length - 1 ? color : '#333'}`,
            color: '#fff',
            borderRadius: '6px',
            padding: '10px 24px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}
        >
          {currentStep === steps.length - 1 ? 'done ✓' : 'next →'}
        </button>
      </div>
    </motion.div>
  )
}
