import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function SpiralNode({
  position,
  color,
  icon,
  phase,
  isActive,
  isCompleted,
  onClick,
  index,
}) {
  const meshRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4 + index * 0.8
      meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.1
      const s = isActive
        ? 1.3 + Math.sin(t * 3) * 0.08
        : isCompleted
        ? 1.1
        : hovered
        ? 1.15
        : 1.0
      meshRef.current.scale.setScalar(s)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.6 + index
      ringRef.current.material.opacity = isActive
        ? 0.9
        : isCompleted
        ? 0.5
        : 0.2
    }
  })

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Outer spinning ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.55, 0.03, 8, 60]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial
          color={isCompleted || isActive ? color : '#111122'}
          emissive={color}
          emissiveIntensity={isActive ? 1.5 : isCompleted ? 0.6 : 0.1}
          metalness={0.8}
          roughness={0.2}
          wireframe={!isActive && !isCompleted}
        />
      </mesh>

      {/* Icon */}
      <Text
        position={[0, 0, 0.4]}
        fontSize={0.22}
        color={isActive || isCompleted ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {icon}
      </Text>

    </group>
  )
}
