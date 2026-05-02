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

    const loop = () => {
      const now = performance.now()
      const delta = now - last
      last = now

      frameTimesRef.current.push(delta)
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift()
      }

      const avg =
        frameTimesRef.current.reduce((a, b) => a + b, 0) /
        frameTimesRef.current.length
      const fps = 1000 / avg

      if (fps < 40) {
        setLowPerformanceMode(true)
      } else {
        setLowPerformanceMode(false)
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
