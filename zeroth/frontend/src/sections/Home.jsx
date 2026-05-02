import SceneCanvas from '../components/three/SceneCanvas'
import Model from '../components/three/Model'
import { OrbitControls } from '@react-three/drei'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <SceneCanvas camera={{ position: [0, 1, 4], fov: 60, near: 0.1, far: 1000 }}>
        <Model
          path="/src/assets/models/gaming_laptop.glb"
          position={[0, 0, 0]}
          scale={1}
          autoRotate
        />
        <OrbitControls enableZoom={true} enablePan={false} />
      </SceneCanvas>
    </div>
  )
}
