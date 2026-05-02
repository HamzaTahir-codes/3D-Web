import { useGLTF } from '@react-three/drei'

export function useModel(path) {
  const { scene, animations, nodes, materials } = useGLTF(path)
  return { scene, animations, nodes, materials }
}

export function preloadModel(path) {
  useGLTF.preload(path)
}
