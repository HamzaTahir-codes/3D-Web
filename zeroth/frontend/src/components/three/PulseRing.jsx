import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function PulseRing({ position, color, trigger }) {
  const meshRef = useRef()
  const progressRef = useRef(0)
  const activeRef = useRef(false)

  useEffect(() => {
    if (trigger) {
      progressRef.current = 0
      activeRef.current = true
    }
  }, [trigger])

  useFrame((_, delta) => {
    if (!activeRef.current || !meshRef.current) return

    progressRef.current += delta * 1.4

    const scale = 1 + progressRef.current * 4
    meshRef.current.scale.setScalar(scale)
    meshRef.current.material.opacity =
      Math.max(0, 0.8 - progressRef.current * 0.9)

    if (progressRef.current >= 1) {
      activeRef.current = false
      progressRef.current = 0
      meshRef.current.scale.setScalar(0)
      meshRef.current.material.opacity = 0
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={0}>
      <ringGeometry args={[0.4, 0.46, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
        side={2}
      />
    </mesh>
  )
}
