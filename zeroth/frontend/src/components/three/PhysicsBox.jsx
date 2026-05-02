import { useBox } from '@react-three/cannon'

export default function PhysicsBox({ position, color, size }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: position || [0, 5, 0],
    args: size || [1, 1, 1],
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size || [1, 1, 1]} />
      <meshStandardMaterial color={color || 'white'} />
    </mesh>
  )
}
