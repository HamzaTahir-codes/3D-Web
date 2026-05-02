import { usePlane } from '@react-three/cannon'

export default function Floor() {
  const [ref] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  )
}
