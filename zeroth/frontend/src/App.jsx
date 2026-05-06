import { useEffect } from 'react'
import { useSceneStore } from './store/sceneStore'
import { usePerformance } from './hooks/usePerformance'
import Home from './sections/Home'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'
import PerformanceStats from './components/ui/PerformanceStats'

export default function App() {
  usePerformance()

  useEffect(() => {
    const handleResize = () => {
      useSceneStore.setState({
        isMobile: window.innerWidth < 768,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    function countContexts() {
      const canvases = document.querySelectorAll('canvas')
      let active = 0
      canvases.forEach(c => {
        const ctx = c.getContext('webgl2') || c.getContext('webgl')
        if (ctx && !ctx.isContextLost()) active++
      })
      console.log(`[ZEROTH AUDIT] Active WebGL contexts: ${active} / ${canvases.length} canvases`)
    }
    const interval = setInterval(countContexts, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const sections = ['Home', 'Projects', 'Skills', 'Experience', 'About', 'Contact']
    console.group('[ZEROTH AUDIT] Site Performance Checklist')
    console.log('Sections built:', sections.join(', '))
    console.log('Device pixel ratio:', window.devicePixelRatio)
    console.log('Hardware concurrency (CPU cores):', navigator.hardwareConcurrency)
    console.log('GPU tier: check manually via chrome://gpu')
    console.log('Scroll through all sections and watch:')
    console.log('  → FPS panel (top-left): target > 50fps idle, > 30fps during animation')
    console.log('  → MS panel: target < 16ms per frame')
    console.log('  → MB panel: watch for memory leaks (should not climb indefinitely)')
    console.log('  → WebGL context log every 3s: should be ≤ 2 active at any time')
    console.groupEnd()
  }, [])

  return (
    <main style={{
      width: '100vw',
      background: '#000',
    }}>
      {import.meta.env.DEV && <PerformanceStats />}
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
      <div id="experience"><Experience /></div>
      <div id="projects"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="contact"><Contact /></div>
    </main>
  )
}
