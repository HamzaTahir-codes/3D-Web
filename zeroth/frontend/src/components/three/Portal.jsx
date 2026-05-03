import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Portal({ position, label, color, onClick }) {
  const ringRef = useRef()
  const innerRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.5) * 0.05
      ringRef.current.position.y =
        position[1] + Math.sin(t * 0.8) * 0.12
    }
    if (innerRef.current) {
      innerRef.current.material.emissiveIntensity =
        hovered
          ? 1.5 + Math.sin(t * 4) * 0.5
          : 0.3 + Math.sin(t * 1.5) * 0.1
      innerRef.current.position.y =
        position[1] + Math.sin(t * 0.8) * 0.12
    }
  })

  const hexColor = new THREE.Color(color)

  return (
    <group
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
      {/* Outer glow ring */}
      <mesh ref={ringRef} position={position}>
        <torusGeometry args={[0.65, 0.06, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 3 : 1}
          transparent
          opacity={hovered ? 1 : 0.8}
        />
      </mesh>

      {/* Inner ring */}
      <mesh position={position}>
        <torusGeometry args={[0.45, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glowing center disc */}
      <mesh ref={innerRef} position={position}>
        <circleGeometry args={[0.42, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={hovered ? 0.25 : 0.1}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[position[0], position[1] - 0.9, position[2]]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {label}
      </Text>
    </group>
  )
}
