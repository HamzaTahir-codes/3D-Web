import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSceneStore } from './store/sceneStore'
import { usePerformance } from './hooks/usePerformance'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'

useGLTF.preload('/src/assets/models/gaming_laptop.glb')

export default function App() {
  usePerformance()

  useEffect(() => {
    const handleResize = () => {
      useSceneStore.setState({ isMobile: window.innerWidth < 768 })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main style={{ width: '100vw', minHeight: '100vh', background: '#000' }}>
      <div id="home"><Home /></div>
      <div id="projects"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="experience"><Experience /></div>
      <div id="about"><About /></div>
      <div id="contact"><Contact /></div>
    </main>
  )
}
