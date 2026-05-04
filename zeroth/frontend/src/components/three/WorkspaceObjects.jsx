import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function LaptopObject({ color, isActive, isDimmed }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.15
    }
  })
  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 0.06, 1.0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDimmed ? 0.01 : (isActive ? 0.4 : 0.1)}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.58, -0.46]}
        rotation={[-0.6, 0, 0]}>
        <boxGeometry args={[1.4, 1.0, 0.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDimmed ? 0.02 : (isActive ? 0.8 : 0.15)}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.58, -0.43]}
        rotation={[-0.6, 0, 0]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial
          color="#000820"
          emissive={color}
          emissiveIntensity={isDimmed ? 0.01 : (isActive ? 0.5 : 0.05)}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

export function BooksObject({ color, isActive, isDimmed }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        clock.getElapsedTime() * 0.2
    }
  })
  const books = [
    { w: 0.18, h: 0.9, d: 0.7, x: -0.3, color: color },
    { w: 0.2, h: 1.0, d: 0.7, x: -0.08, color: '#e24b4a' },
    { w: 0.16, h: 0.8, d: 0.7, x: 0.14, color: '#378add' },
    { w: 0.22, h: 0.95, d: 0.7, x: 0.36, color: '#1d9e75' },
  ]
  return (
    <group ref={groupRef}>
      {books.map((b, i) => (
        <mesh key={i} position={[b.x, 0, 0]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={isDimmed ? 0.02 : (isActive ? 0.6 : 0.1)}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export function BoardObject({ color, isActive, isDimmed }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        clock.getElapsedTime() * 0.35
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.4) * 0.1
    }
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.2, 0.06, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDimmed ? 0.02 : (isActive ? 0.5 : 0.1)}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      {[[-0.3, 0.1, 0.1], [0.2, 0.1, -0.1],
        [-0.1, 0.1, -0.2], [0.35, 0.1, 0.2]
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.18, 0.07, 0.18]} />
          <meshStandardMaterial
            color="#111"
            emissive={color}
            emissiveIntensity={isDimmed ? 0.05 : (isActive ? 1.0 : 0.2)}
          />
        </mesh>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i}
          position={[-0.45 + i * 0.22, 0.08, 0.42]}>
          <cylinderGeometry args={[0.012, 0.012, 0.15, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDimmed ? 0.05 : (isActive ? 1.2 : 0.3)}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  )
}

export function CoffeeObject({ color, isActive, isDimmed }) {
  const steamRef = useRef()
  useFrame(({ clock }) => {
    if (steamRef.current) {
      steamRef.current.position.y =
        0.8 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08
      steamRef.current.material.opacity =
        isDimmed ? 0.02 : (isActive
          ? 0.4 + Math.sin(clock.getElapsedTime() * 2) * 0.2
          : 0.1)
    }
  })
  return (
    <group>
      {/* Cup */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.22, 0.55, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      {/* Coffee */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDimmed ? 0.05 : (isActive ? 0.8 : 0.2)}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0.35, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 20,
          Math.PI]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Steam */}
      <mesh ref={steamRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

export function TerminalObject({ color, isActive, isDimmed }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.25) * 0.2
    }
  })
  return (
    <group ref={groupRef}>
      {/* Monitor */}
      <mesh>
        <boxGeometry args={[1.3, 0.9, 0.07]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.1, 0.72]} />
        <meshStandardMaterial
          color="#000820"
          emissive={color}
          emissiveIntensity={isDimmed ? 0.02 : (isActive ? 0.6 : 0.1)}
        />
      </mesh>
      {/* Text lines */}
      {[0.2, 0.05, -0.1, -0.25].map((y, i) => (
        <mesh key={i} position={[-0.2 + i * 0.05, y, 0.05]}>
          <planeGeometry args={[0.4 + i * 0.1, 0.03]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isDimmed ? 0.05 : (isActive ? 1.0 : 0.3)}
          />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[0.12, 0.26, 0.12]} />
        <meshStandardMaterial color="#222" metalness={0.9} />
      </mesh>
    </group>
  )
}
