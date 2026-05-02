import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Clone } from '@react-three/drei'

export default function Model({ path, position, rotation, scale, autoRotate }) {
  const { scene } = useGLTF(path)
  const ref = useRef()

  useFrame((state, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Clone
      ref={ref}
      object={scene}
      position={position || [0, 0, 0]}
      rotation={rotation || [0, 0, 0]}
      scale={scale || 1}
      castShadow
      receiveShadow
    />
  )
}
