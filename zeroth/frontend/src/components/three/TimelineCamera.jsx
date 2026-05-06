import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { pathPoints } from '../../data/experienceData'

export default function TimelineCamera({ activeIndex, total }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 2, 4))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))

  const curve = useRef(
    new THREE.CatmullRomCurve3(
      pathPoints.map((p) => new THREE.Vector3(...p))
    )
  )

  useEffect(() => {
    const t = total > 1 ? activeIndex / (total - 1) : 0
    const point = curve.current.getPoint(t)
    targetPos.current.set(
      point.x - 0.5,
      point.y + 2.2,
      point.z + 5
    )
    targetLook.current.set(
      point.x,
      point.y + 0.5,
      point.z
    )
  }, [activeIndex, total])

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.04)
    currentLook.current.lerp(targetLook.current, 0.04)
    camera.lookAt(currentLook.current)
  })

  return null
}