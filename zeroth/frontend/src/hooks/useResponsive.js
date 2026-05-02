import { useState, useEffect } from 'react'
import { useSceneStore } from '../store/sceneStore'

export function useResponsive() {
  const isMobile = useSceneStore((s) => s.isMobile)

  const [config, setConfig] = useState({
    cameraZ: isMobile ? 12 : 8,
    cameraY: isMobile ? 3 : 2,
    modelScale: isMobile ? 0.6 : 1,
    fov: isMobile ? 85 : 75,
  })

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setConfig({
        cameraZ: mobile ? 12 : 8,
        cameraY: mobile ? 3 : 2,
        modelScale: mobile ? 0.6 : 1,
        fov: mobile ? 85 : 75,
      })
    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [])

  return config
}
