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

      // Skip the first 180 frames (approx 3 seconds) to allow for all mounting/parsing
      samples++
      if (samples < 180) {
        frameRef.current = requestAnimationFrame(loop)
        return
      }

      frameTimesRef.current.push(delta)
      if (frameTimesRef.current.length > 120) {
        frameTimesRef.current.shift()
      }

      const avg =
        frameTimesRef.current.reduce((a, b) => a + b, 0) /
        frameTimesRef.current.length
      const fps = 1000 / avg

      // Only switch modes if we have a full stable window
      if (frameTimesRef.current.length === 120) {
        // High quality: > 55 FPS
        // Low quality: < 40 FPS
        if (fps < 40) {
          setLowPerformanceMode(true)
        } else if (fps > 55) {
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
