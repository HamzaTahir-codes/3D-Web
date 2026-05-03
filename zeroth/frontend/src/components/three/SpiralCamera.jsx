import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function SpiralCamera({ targetPosition, activeIndex }) {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 11))
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    if (!targetPosition) return

    const [tx, ty, tz] = targetPosition

    // Tilt-aware offset — pull back and slightly above target
    targetRef.current.set(
      tx * 0.3,
      ty * 0.3,
      11
    )
    lookAtRef.current.set(tx * 0.5, ty * 0.5, 0)
  }, [targetPosition, activeIndex])

  useFrame(() => {
    camera.position.lerp(targetRef.current, 0.04)
    const currentLookAt = new THREE.Vector3()
    currentLookAt.lerp(lookAtRef.current, 0.04)
    camera.lookAt(currentLookAt)
  })

  return null
}
