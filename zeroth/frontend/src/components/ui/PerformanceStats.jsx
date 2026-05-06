import { useEffect, useRef } from 'react'
import Stats from 'stats.js'

export default function PerformanceStats() {
  const statsRef = useRef([])

  useEffect(() => {
    // Panel 0 = FPS, Panel 1 = MS frame time, Panel 2 = MB memory
    const panels = [0, 1, 2].map(type => {
      const s = new Stats()
      s.showPanel(type)
      s.dom.style.position = 'fixed'
      s.dom.style.top = `${type * 50}px`
      s.dom.style.left = '0px'
      s.dom.style.zIndex = '9999'
      s.dom.style.opacity = '0.85'
      document.body.appendChild(s.dom)
      return s
    })
    statsRef.current = panels

    let rafId
    function loop() {
      panels.forEach(s => { s.begin(); s.end() })
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      panels.forEach(s => document.body.removeChild(s.dom))
    }
  }, [])

  return null
}
