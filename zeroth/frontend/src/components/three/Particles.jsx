import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count }) {
  const mesh = useRef()
  const total = count || 120

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(total * 3)
    const spd = new Float32Array(total)
    for (let i = 0; i < total; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      spd[i] = 0.002 + Math.random() * 0.004
    }
    return [pos, spd]
  }, [total])

  useFrame(() => {
    if (mesh.current) {
      const pos = mesh.current.geometry.attributes.position.array
      for (let i = 0; i < total; i++) {
        pos[i * 3 + 1] += speeds[i]
        if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={total}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
