import { useState, useCallback } from 'react'
import { sendContactMessage } from '../api'

const STEPS = [
  {
    field: 'name',
    prompt: 'visitor@zeroth:~$',
    question: 'identify yourself. what is your name?',
    placeholder: 'your name...',
    validate: (v) => v.trim().length >= 2
      ? null : 'name must be at least 2 characters.',
  },
  {
    field: 'email',
    prompt: 'visitor@zeroth:~$',
    question: 'drop your email so I can reach back.',
    placeholder: 'your@email.com',
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ? null : 'that does not look like a valid email.',
  },
  {
    field: 'subject',
    prompt: 'visitor@zeroth:~$',
    question: 'what is this about?',
    placeholder: 'subject...',
    validate: (v) => v.trim().length >= 2
      ? null : 'give me a subject.',
  },
  {
    field: 'message',
    prompt: 'visitor@zeroth:~$',
    question: 'go ahead. what do you want to build?',
    placeholder: 'your message...',
    validate: (v) => v.trim().length >= 10
      ? null : 'say a bit more — at least 10 characters.',
    multiline: true,
  },
]

export function useTerminal() {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: "initializing secure channel...",
    },
    {
      type: 'system',
      text: "connected to hamza@zeroth.dev",
    },
    {
      type: 'system',
      text: "type your response and press Enter.",
    },
    {
      type: 'divider',
    },
    {
      type: 'prompt',
      label: 'visitor@zeroth:~$',
      text: STEPS[0].question,
    },
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const [formData, setFormData] = useState({})
  const [currentInput, setCurrentInput] = useState('')
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  const pushHistory = useCallback((entries) => {
    setHistory((prev) => [...prev, ...entries])
  }, [])

  const handleSubmit = useCallback(async () => {
    const step = STEPS[stepIndex]
    const value = currentInput.trim()
    const validationError = step.validate(value)

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    const updatedData = { ...formData, [step.field]: value }
    setFormData(updatedData)

    pushHistory([
      {
        type: 'input',
        label: 'visitor@zeroth:~$',
        text: value,
      },
    ])

    setCurrentInput('')

    if (stepIndex < STEPS.length - 1) {
      const nextStep = STEPS[stepIndex + 1]
      setTimeout(() => {
        pushHistory([
          { type: 'spacer' },
          {
            type: 'prompt',
            label: 'visitor@zeroth:~$',
            text: nextStep.question,
          },
        ])
        setStepIndex(stepIndex + 1)
      }, 300)
    } else {
      setStatus('sending')
      pushHistory([
        { type: 'spacer' },
        { type: 'system', text: 'transmitting...' },
      ])

      try {
        await sendContactMessage(updatedData)
        setStatus('success')
        pushHistory([
          { type: 'spacer' },
          {
            type: 'success',
            text: "message received. I'll get back to you soon.",
          },
          {
            type: 'success',
            text: '> connection closed. thanks for reaching out.',
          },
        ])
      } catch {
        setStatus('error')
        pushHistory([
          { type: 'spacer' },
          {
            type: 'error',
            text: 'transmission failed. try again or email directly:',
          },
          {
            type: 'error',
            text: 'm.hamza.codes@gmail.com',
          },
        ])
      }
    }
  }, [stepIndex, currentInput, formData, pushHistory])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [handleSubmit])

  const currentStep = STEPS[stepIndex]
  const isDone = status === 'success' || status === 'error'

  return {
    history,
    currentInput,
    setCurrentInput,
    currentStep,
    error,
    status,
    isDone,
    handleKeyDown,
    handleSubmit,
  }
}
