import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

export default function SceneCanvas({ children, camera, gravity }) {
  return (
    <Canvas
      shadows
      camera={camera || { position: [0, 2, 8], fov: 75, near: 0.1, far: 1000 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Physics gravity={gravity || [0, -9.81, 0]}>
        {children}
      </Physics>
      <Preload all />
    </Canvas>
  )
}
