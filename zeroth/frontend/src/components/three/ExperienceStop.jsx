import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { pathPoints } from '../../data/experienceData'

function EducationModel({ color, isActive }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y =
        clock.getElapsedTime() * (isActive ? 0.6 : 0.2)
    }
  })
  return (
    <group ref={ref}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.15, 6]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 1.5 : 0.4}
        />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.1, 0.08, 1.1]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 2 : 0.5}
        />
      </mesh>
      <mesh position={[0.5, 0.35, 0]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  )
}

function InternshipModel({ color, isActive }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.y =
        clock.getElapsedTime() * (isActive ? 0.5 : 0.15)
  })
  return (
    <group ref={ref}>
      {[0, 0.35, 0.7].map((y, i) => (
        <mesh key={i} position={[0, y - 0.35, 0]}>
          <boxGeometry args={[0.9, 0.22, 0.5]} />
          <meshStandardMaterial
            color={color} emissive={color}
            emissiveIntensity={isActive ? 1.5 - i * 0.3 : 0.3}
            transparent opacity={0.85}
          />
        </mesh>
      ))}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={`led-${i}`} position={[x, 0.38, 0.26]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial
            color="#00ff88" emissive="#00ff88"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  )
}

function ResearchModel({ color, isActive }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y =
        clock.getElapsedTime() * (isActive ? 0.7 : 0.2)
      ref.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.8) * 0.08
    }
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 1.2 : 0.3}
          transparent opacity={0.8} wireframe
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.03, 8, 40]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 2 : 0.5}
        />
      </mesh>
      <mesh rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[0.75, 0.02, 8, 40]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff"
          emissiveIntensity={isActive ? 1 : 0.2}
          transparent opacity={0.5}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  )
}

function CurrentModel({ color, isActive }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.y =
        clock.getElapsedTime() * (isActive ? 0.8 : 0.3)
  })
  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.8, 0.12, 0.5]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 2 : 0.5}
        />
      </mesh>
      {[-0.28, -0.14, 0, 0.14, 0.28].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.12, 0.3]}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
            <meshStandardMaterial color="#aaaaaa" />
          </mesh>
          <mesh position={[x, -0.12, -0.3]}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
            <meshStandardMaterial color="#aaaaaa" />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <torusGeometry args={[0.5, 0.02, 8, 40]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={isActive ? 3 : 0.5}
          transparent opacity={0.7}
        />
      </mesh>
    </group>
  )
}

const MODEL_MAP = {
  education: EducationModel,
  internship: InternshipModel,
  remote: ResearchModel,
  current: CurrentModel,
}

export default function ExperienceStop({
  experience, index, total, isActive, isPast,
}) {
  const curve = useRef(
    new THREE.CatmullRomCurve3(
      pathPoints.map((p) => new THREE.Vector3(...p))
    )
  )
  const t = index / (total - 1)
  const point = curve.current.getPoint(t)
  const position = [point.x, point.y + 0.8, point.z]
  const ModelComponent = MODEL_MAP[experience.type] || ResearchModel

  return (
    <group position={position}>
      <mesh position={[0, -0.7, 0]}>
        <torusGeometry args={[0.5, 0.03, 8, 40]} />
        <meshStandardMaterial
          color={experience.color}
          emissive={experience.color}
          emissiveIntensity={isActive ? 2.5 : isPast ? 0.8 : 0.1}
          transparent
          opacity={isActive ? 1 : isPast ? 0.5 : 0.2}
        />
      </mesh>
      <group scale={isActive ? 0.5 : 0.3}>
        <ModelComponent
          color={experience.color}
          isActive={isActive}
        />
      </group>
      {isActive && (
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff" emissive="#ffffff"
            emissiveIntensity={2}
          />
        </mesh>
      )}
    </group>
  )
}