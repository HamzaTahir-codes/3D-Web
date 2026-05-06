import { useMemo } from 'react'
import * as THREE from 'three'
import { pathPoints } from '../../data/experienceData'

export default function ExperiencePath({ activeIndex, total }) {
  const curve = useMemo(() => {
    const pts = pathPoints.map((p) => new THREE.Vector3(...p))
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  const fullGeometry = useMemo(() => {
    const pts = curve.getPoints(80)
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [curve])

  const progressGeometry = useMemo(() => {
    const progress = activeIndex / (total - 1)
    const count = Math.floor(progress * 80)
    if (count < 2) return null
    const pts = curve.getPoints(80).slice(0, count)
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [curve, activeIndex, total])

  // Ground markers along path
  const markerPositions = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const t = i / (total - 1)
      return curve.getPoint(t)
    })
  }, [curve, total])

  return (
    <group>
      {/* Full dim path */}
      <line geometry={fullGeometry}>
        <lineBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.8}
        />
      </line>

      {/* Lit progress path */}
      {progressGeometry && (
        <line geometry={progressGeometry}>
          <lineBasicMaterial
            color="#4f46e5"
            transparent
            opacity={0.9}
          />
        </line>
      )}

      {/* Path markers */}
      {markerPositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y - 0.05, pos.z]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 6]} />
          <meshStandardMaterial
            color={i <= activeIndex ? '#4f46e5' : '#1a1a2e'}
            emissive={i <= activeIndex ? '#4f46e5' : '#000000'}
            emissiveIntensity={i === activeIndex ? 2 : 0.5}
          />
        </mesh>
      ))}

      {/* Floating particles along path */}
      {markerPositions.map((pos, i) => (
        i <= activeIndex && (
          <mesh
            key={`glow-${i}`}
            position={[pos.x, pos.y + 0.3, pos.z]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#4f46e5"
              emissive="#4f46e5"
              emissiveIntensity={1.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        )
      ))}
    </group>
  )
}
