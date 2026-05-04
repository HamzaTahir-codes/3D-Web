import { useEffect, useRef, useCallback } from 'react'
import { useSceneStore } from '../store/sceneStore'

export function usePerformance() {
  const frameTimesRef = useRef([])
  const frameRef = useRef(null)
  const setLowPerformanceMode = useSceneStore(
    (s) => s.setLowPerformanceMode
  )

  const measure = useCallback(() => {
    let last = performance.now()
    let samples = 0

    const loop = () => {
      const now = performance.now()
      const delta = now - last
      last = now

      // Skip the first few frames to allow for initialization
      samples++
      if (samples < 120) {
        frameRef.current = requestAnimationFrame(loop)
        return
      }

      frameTimesRef.current.push(delta)
      if (frameTimesRef.current.length > 100) {
        frameTimesRef.current.shift()
      }

      const avg =
        frameTimesRef.current.reduce((a, b) => a + b, 0) /
        frameTimesRef.current.length
      const fps = 1000 / avg

      // Only switch to low performance if we have enough samples
      if (frameTimesRef.current.length === 100) {
        if (fps < 35) {
          setLowPerformanceMode(true)
        } else if (fps > 50) {
          setLowPerformanceMode(false)
        }
      }

      frameRef.current = requestAnimationFrame(loop)
    }

    frameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [setLowPerformanceMode])

  useEffect(() => {
    const cleanup = measure()
    return cleanup
  }, [measure])
}
