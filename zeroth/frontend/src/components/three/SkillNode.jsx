import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import {
  SnakeObject, AtomObject, CircuitObject,
  NeuralObject, PhoneObject, NodesObject,
  GearObject
} from './SkillObjects'

const objectMap = {
  snake: SnakeObject,
  atom: AtomObject,
  circuit: CircuitObject,
  neural: NeuralObject,
  phone: PhoneObject,
  nodes: NodesObject,
  gear: GearObject,
}

export default function SkillNode({
  position, name, type, color,
  isActive, onClick, index,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const ObjectComponent = objectMap[type]

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] +
        Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.12
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
      <group scale={1.4}>
        <ObjectComponent color={color} isActive={isActive || hovered} />
      </group>

      {(isActive || hovered) && (
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.16}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {name}
        </Text>
      )}
    </group>
  )
}
