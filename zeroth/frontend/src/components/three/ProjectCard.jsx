import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'

export default function ProjectCard({
  position,
  title,
  shortDescription,
  category,
  techStack,
  onClick,
  isActive,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  const categoryColors = {
    fullstack: '#4f46e5',
    iot: '#10b981',
    mobile: '#f59e0b',
    other: '#6b7280',
  }
  const color = categoryColors[category] || '#6b7280'

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Only bob up and down — no rotation
      groupRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.6 + position[0]) * 0.08

      // Slight scale on hover/active — no rotation
      const targetScale = isActive ? 1.06 : hovered ? 1.03 : 1
      groupRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        0.08
      )
    }
  })

  return (
    <group
      ref={groupRef}
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
      {/* Card body */}
      <RoundedBox
        args={[2.2, 2.8, 0.08]}
        radius={0.08}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial
          color={isActive ? '#0d0d2e' : hovered ? '#0d0d1e' : '#080810'}
          emissive={color}
          emissiveIntensity={isActive ? 0.25 : hovered ? 0.1 : 0.02}
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Top color bar */}
      <mesh position={[0, 1.25, 0.05]}>
        <planeGeometry args={[2.2, 0.26]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Category label */}
      <Text
        position={[0, 1.25, 0.1]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {category.toUpperCase()}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0.72, 0.1]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.9}
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {title}
      </Text>

      {/* Divider line */}
      <mesh position={[0, 0.38, 0.05]}>
        <planeGeometry args={[1.8, 0.008]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>

      {/* Description */}
      <Text
        position={[0, -0.1, 0.1]}
        fontSize={0.108}
        color="#999999"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.85}
        lineHeight={1.5}
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {shortDescription}
      </Text>

      {/* Tech stack */}
      <Text
        position={[0, -0.88, 0.1]}
        fontSize={0.095}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.85}
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {techStack.slice(0, 4).join(' · ')}
      </Text>

      {/* Click hint */}
      <Text
        position={[0, -1.2, 0.1]}
        fontSize={0.088}
        color={isActive ? color : hovered ? '#666666' : '#2a2a2a'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {isActive ? '[ viewing ]' : '[ click to explore ]'}
      </Text>
    </group>
  )
}
