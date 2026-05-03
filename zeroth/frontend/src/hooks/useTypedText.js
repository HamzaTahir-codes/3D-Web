import { useState, useEffect } from 'react'

export function useTypedText(lines, speed = 28) {
  const [displayed, setDisplayed] = useState([])
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    setDisplayed([])
    setLineIndex(0)
    setCharIndex(0)
  }, [lines])

  useEffect(() => {
    if (lineIndex >= lines.length) return
    const current = lines[lineIndex]

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const updated = [...prev]
          updated[lineIndex] = (updated[lineIndex] || '') + current[charIndex]
          return updated
        })
        setCharIndex((c) => c + 1)
      }, speed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1)
        setCharIndex(0)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [lineIndex, charIndex, lines, speed])

  return displayed
}
