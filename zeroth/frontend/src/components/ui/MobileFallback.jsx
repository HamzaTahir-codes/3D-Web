import { useState, useEffect } from 'react'
import { useSceneStore } from '../../store/sceneStore'

export default function MobileFallback({ children, fallback }) {
  const lowPerformanceMode = useSceneStore(
    (s) => s.lowPerformanceMode
  )
  const [isMobile, setIsMobile] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    setChecked(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Don't render anything until we've checked
  if (!checked) return null

  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '13px',
      }}>
        {fallback || (
          <p>Switch to desktop for the full 3D experience.</p>
        )}
      </div>
    )
  }

  return children
}
