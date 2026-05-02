import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useSceneStore } from '../../store/sceneStore'

export default function SceneCanvas({ children, camera, gravity, physics }) {
  const lowPerformanceMode = useSceneStore((s) => s.lowPerformanceMode)

  const content = (
    <>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={3}
        castShadow={!lowPerformanceMode}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <pointLight position={[0, 3, 3]} intensity={2} color="#ffffff" />
      {children}
      <Preload all />
    </>
  )

  return (
    <Canvas
      shadows={!lowPerformanceMode}
      camera={camera || { position: [0, 2, 8], fov: 75, near: 0.1, far: 1000 }}
      gl={{
        antialias: !lowPerformanceMode,
        powerPreference: 'high-performance',
        stencil: false,
        shadowMapType: 1,
      }}
      style={{ width: '100%', height: '100%' }}
      dpr={lowPerformanceMode ? [1, 1] : [1, 2]}
    >
      {physics ? (
        <Physics gravity={gravity || [0, -9.81, 0]}>
          {content}
        </Physics>
      ) : (
        content
      )}
    </Canvas>
  )
}
