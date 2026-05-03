import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export default function FloatingText({ text, position, fontSize, color, floatSpeed, floatHeight }) {
  const ref = useRef()
  const speed = floatSpeed || 1
  const height = floatHeight || 0.15

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * speed) * height
    }
  })

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={fontSize || 0.3}
      color={color || '#ffffff'}
      anchorX="center"
      anchorY="middle"
      font="/fonts/JetBrainsMono-Regular.ttf"
    >
      {text}
    </Text>
  )
}
