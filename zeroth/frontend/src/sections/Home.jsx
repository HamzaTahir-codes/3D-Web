import SceneCanvas from '../components/three/SceneCanvas'
import Model from '../components/three/Model'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import { OrbitControls } from '@react-three/drei'
import { useResponsive } from '../hooks/useResponsive'

export default function Home() {
  const { cameraZ, cameraY, modelScale, fov } = useResponsive()

  return (
    <SectionTransition id="home">
      <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
        <MobileFallback>
          <SceneCanvas
            camera={{
              position: [0, cameraY, cameraZ],
              fov,
              near: 0.1,
              far: 1000,
            }}
          >
            <Model
              path="/src/assets/models/gaming_laptop.glb"
              position={[0, 0, 0]}
              scale={modelScale}
              autoRotate
            />
            <OrbitControls enableZoom={true} enablePan={false} />
          </SceneCanvas>
        </MobileFallback>
      </div>
    </SectionTransition>
  )
}
