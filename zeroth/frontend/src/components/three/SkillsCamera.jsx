import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function SkillsCamera({ targetPosition }) {
  const { camera } = useThree()
  const camTarget = useRef(new THREE.Vector3(0, 0, 9))
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    if (!targetPosition) {
      camTarget.current.set(0, 0, 9)
      lookTarget.current.set(0, 0, 0)
      return
    }
    const [tx, ty, tz] = targetPosition
    camTarget.current.set(tx * 0.4, ty * 0.4, tz + 4)
    lookTarget.current.set(tx * 0.6, ty * 0.6, tz)
  }, [targetPosition])

  useFrame(() => {
    camera.position.lerp(camTarget.current, 0.05)
    const lk = new THREE.Vector3()
    lk.copy(lookTarget.current)
    camera.lookAt(lk)
  })

  return null
}
