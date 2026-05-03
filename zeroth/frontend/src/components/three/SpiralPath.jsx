import { useMemo } from 'react'
import * as THREE from 'three'
import { spiralPhases } from '../../data/spiralWorkflow'

function SpiralCurve({ activeIndex }) {
  const points = useMemo(() => {
    const pts = []
    const total = 200
    for (let i = 0; i <= total; i++) {
      const t = i / total
      const turns = 0.92
      const angle = t * turns * Math.PI * 2 - Math.PI / 2
      const radius = 0.6 + t * 4.2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ))
    }
    return pts
  }, [])

  const activePoints = useMemo(() => {
    if (activeIndex === 0) return []
    const total = 200
    const pts = []
    const progress = activeIndex / (spiralPhases.length - 1)
    const count = Math.floor(progress * total)
    for (let i = 0; i <= count; i++) {
      const t = i / total
      const turns = 0.92
      const angle = t * turns * Math.PI * 2 - Math.PI / 2
      const radius = 0.6 + t * 4.2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ))
    }
    return pts
  }, [activeIndex])

  const dimGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(300)
    )
  }, [points])

  const activeGeometry = useMemo(() => {
    if (activePoints.length < 2) return null
    const curve = new THREE.CatmullRomCurve3(activePoints)
    return new THREE.BufferGeometry().setFromPoints(
      curve.getPoints(200)
    )
  }, [activePoints])

  return (
    <group>
      {/* Dim full spiral path */}
      <line geometry={dimGeometry}>
        <lineBasicMaterial
          color="#222244"
          transparent
          opacity={0.6}
        />
      </line>

      {/* Lit progress path */}
      {activeGeometry && (
        <line geometry={activeGeometry}>
          <lineBasicMaterial
            color={spiralPhases[activeIndex].color}
            transparent
            opacity={0.9}
          />
        </line>
      )}

      {/* Radial lines from center to each node */}
      {spiralPhases.map((p, i) => {
        const start = new THREE.Vector3(0, 0, 0)
        const end = new THREE.Vector3(...p.position)
        const geo = new THREE.BufferGeometry().setFromPoints([start, end])
        return (
          <line key={p.id} geometry={geo}>
            <lineBasicMaterial
              color={i <= activeIndex ? p.color : '#1a1a2e'}
              transparent
              opacity={i <= activeIndex ? 0.4 : 0.15}
            />
          </line>
        )
      })}
    </group>
  )
}

export default SpiralCurve
