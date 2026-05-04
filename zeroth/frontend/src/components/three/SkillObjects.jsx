import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SnakeObject({ color, isActive }) {
  const groupRef = useRef()
  const segments = 12

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const offset = i * 0.5
      child.position.x = Math.sin(t * 1.4 + offset) * 0.7
      child.position.y = Math.cos(t * 0.9 + offset) * 0.45
      child.position.z = Math.sin(t * 0.7 + offset) * 0.3
      const s = 1 - i * 0.055
      child.scale.setScalar(Math.max(s, 0.2))
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: segments }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1.2 - i * 0.08 : 0.3}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export function AtomObject({ color, isActive }) {
  const e1 = useRef()
  const e2 = useRef()
  const e3 = useRef()
  const coreRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const r = 1.0
    if (e1.current)
      e1.current.position.set(Math.cos(t * 1.2) * r, Math.sin(t * 1.2) * r, 0)
    if (e2.current)
      e2.current.position.set(
        Math.cos(t * 0.9 + 2.1) * r, 0,
        Math.sin(t * 0.9 + 2.1) * r
      )
    if (e3.current)
      e3.current.position.set(
        0,
        Math.cos(t * 1.1 + 4.2) * r,
        Math.sin(t * 1.1 + 4.2) * r
      )
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity =
        isActive ? 1.5 + Math.sin(t * 4) * 0.3 : 0.5
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {[e1, e2, e3].map((ref, i) => (
        <mesh key={i} ref={ref}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={isActive ? 1.2 : 0.6}
          />
        </mesh>
      ))}
      {[0, Math.PI / 2, Math.PI / 3].map((rot, i) => (
        <mesh key={i} rotation={[rot, rot * 0.5, 0]}>
          <torusGeometry args={[1.0, 0.015, 8, 80]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 0.8 : 0.2}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export function CircuitObject({ color, isActive }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main board */}
      <mesh>
        <boxGeometry args={[1.4, 0.08, 1.0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.6 : 0.15}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      {/* Chips */}
      {[[-0.4, 0.1, 0.1], [0.3, 0.1, -0.2], [-0.1, 0.1, -0.3]].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.22, 0.08, 0.22]} />
          <meshStandardMaterial
            color="#111"
            emissive={color}
            emissiveIntensity={isActive ? 0.8 : 0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
      {/* Pins */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.55 + i * 0.22, 0.05, 0.55]}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.18, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1 : 0.3}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  )
}

export function NeuralObject({ color, isActive }) {
  const groupRef = useRef()
  const pulseRef = useRef(0)

  const layers = [
    [[-0, 0.8, 0]],
    [[-0.6, 0.2, 0.2], [0.6, 0.2, -0.2]],
    [[-0.8, -0.5, 0], [0, -0.4, 0.3], [0.8, -0.5, 0]],
    [[0, -1.0, 0]],
  ]
  const allNodes = layers.flat()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    pulseRef.current = t
    if (groupRef.current)
      groupRef.current.rotation.y = t * 0.25
  })

  return (
    <group ref={groupRef}>
      {allNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1.2 : 0.3}
          />
        </mesh>
      ))}
      {/* Connections between layers */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((from, fi) =>
          layers[li + 1].map((to, ti) => {
            const start = new THREE.Vector3(...from)
            const end = new THREE.Vector3(...to)
            const dir = new THREE.Vector3().subVectors(end, start)
            const len = dir.length()
            const mid = new THREE.Vector3()
              .addVectors(start, end)
              .multiplyScalar(0.5)
            return (
              <mesh
                key={`${li}-${fi}-${ti}`}
                position={mid}
                quaternion={new THREE.Quaternion().setFromUnitVectors(
                  new THREE.Vector3(0, 1, 0),
                  dir.normalize()
                )}
              >
                <cylinderGeometry args={[0.012, 0.012, len, 4]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={isActive ? 0.6 : 0.1}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            )
          })
        )
      )}
    </group>
  )
}

export function PhoneObject({ color, isActive }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.65, 1.2, 0.08]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.4 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.05, 0.05]}>
        <planeGeometry args={[0.52, 0.9]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.9 : 0.15}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Home bar */}
      <mesh position={[0, -0.48, 0.05]}>
        <boxGeometry args={[0.2, 0.025, 0.01]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Camera */}
      <mesh position={[0, 0.52, 0.05]}>
        <circleGeometry args={[0.04, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  )
}

export function NodesObject({ color, isActive }) {
  const groupRef = useRef()
  const nodePositions = [
    [-0.8, 0.5, 0.2], [0.8, 0.5, -0.2],
    [0, 0, 0.4], [-0.8, -0.5, -0.2],
    [0.8, -0.5, 0.2], [0, 0.9, 0],
    [0, -0.9, 0],
  ]

  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isActive ? 1.2 : 0.35}
          />
        </mesh>
      ))}
      {nodePositions.slice(0, -1).map((from, i) => {
        const to = nodePositions[i + 1]
        const start = new THREE.Vector3(...from)
        const end = new THREE.Vector3(...to)
        const dir = new THREE.Vector3().subVectors(end, start)
        const len = dir.length()
        const mid = new THREE.Vector3()
          .addVectors(start, end).multiplyScalar(0.5)
        return (
          <mesh
            key={`l${i}`}
            position={mid}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              dir.normalize()
            )}
          >
            <cylinderGeometry args={[0.01, 0.01, len, 4]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isActive ? 0.6 : 0.15}
              transparent
              opacity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function GearObject({ color, isActive }) {
  const gear1 = useRef()
  const gear2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (gear1.current) gear1.current.rotation.z = t * 0.6
    if (gear2.current) gear2.current.rotation.z = -t * 0.6 * (8 / 5)
  })

  return (
    <group>
      <mesh ref={gear1} position={[-0.4, 0, 0]}>
        <torusGeometry args={[0.55, 0.14, 6, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.7 : 0.15}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[-0.4, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.16, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.1}
          metalness={1}
        />
      </mesh>
      <mesh ref={gear2} position={[0.72, 0, 0]}>
        <torusGeometry args={[0.35, 0.1, 6, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.7 : 0.15}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      <mesh position={[0.72, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.16, 10]} />
        <meshStandardMaterial
          color={color} metalness={1}
        />
      </mesh>
    </group>
  )
}
