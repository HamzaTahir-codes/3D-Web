import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import {
  LaptopObject, BooksObject, BoardObject,
  CoffeeObject, TerminalObject,
} from './WorkspaceObjects'

const objectMap = {
  laptop: LaptopObject,
  books: BooksObject,
  board: BoardObject,
  coffee: CoffeeObject,
  terminal: TerminalObject,
}

const typeMap = {
  1: 'laptop',
  2: 'books',
  3: 'board',
  4: 'coffee',
  5: 'terminal',
}

export default function WorkspaceNode({
  id, position, name, color,
  isActive, isDimmed, onClick, index,
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const ObjectComponent = objectMap[typeMap[id]]

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] +
        Math.sin(clock.getElapsedTime() * 0.5 + index) * 0.1
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
      <group scale={1.2}>
        <ObjectComponent
          color={color}
          isActive={isActive || hovered}
          isDimmed={isDimmed}
        />
      </group>

      {(isActive || hovered) && (
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.15}
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
