import { useSceneStore } from '../../store/sceneStore'

export default function MobileFallback({ children, fallback }) {
  const isMobile = useSceneStore((s) => s.isMobile)
  const lowPerformanceMode = useSceneStore((s) => s.lowPerformanceMode)

  if (isMobile || lowPerformanceMode) {
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
      }}>
        {fallback || <p>Switch to desktop for the full 3D experience.</p>}
      </div>
    )
  }

  return children
}
