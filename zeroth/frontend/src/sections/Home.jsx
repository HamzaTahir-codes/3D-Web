import SceneCanvas from '../components/three/SceneCanvas'
import FloatingText from '../components/three/FloatingText'
import Portal from '../components/three/Portal'
import Particles from '../components/three/Particles'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import { useResponsive } from '../hooks/useResponsive'
import { useSceneStore } from '../store/sceneStore'

export default function Home() {
  const { cameraZ, cameraY, fov } = useResponsive()
  const setActiveSection = useSceneStore((s) => s.setActiveSection)

  const handlePortalClick = (section) => {
    setActiveSection(section)
    const el = document.getElementById(section)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionTransition id="home">
      <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
        <MobileFallback>
          <SceneCanvas
            camera={{
              position: [0, cameraY, cameraZ],
              fov,
              near: 0.1,
              far: 1000,
            }}
          >
            <Particles count={120} />

            {/* Identity */}
            <FloatingText
              text="Muhammad Hamza Tahir"
              position={[0, 3.0, 0]}
              fontSize={0.38}
              color="#ffffff"
              floatSpeed={0.6}
              floatHeight={0.08}
            />
            <FloatingText
              text="Embedded Systems & Full-Stack Engineer"
              position={[0, 2.4, 0]}
              fontSize={0.18}
              color="#aaaaaa"
              floatSpeed={0.5}
              floatHeight={0.06}
            />
            <FloatingText
              text="I build systems that work — from firmware to frontend."
              position={[0, 2.0, 0]}
              fontSize={0.14}
              color="#555555"
              floatSpeed={0.4}
              floatHeight={0.05}
            />

            {/* Row 1 portals */}
            <Portal
              position={[-3.2, 0.2, 0]}
              label="Projects"
              color="#4f46e5"
              onClick={() => handlePortalClick('projects')}
            />
            <Portal
              position={[0, 0.2, 0]}
              label="Skills"
              color="#0ea5e9"
              onClick={() => handlePortalClick('skills')}
            />
            <Portal
              position={[3.2, 0.2, 0]}
              label="Experience"
              color="#10b981"
              onClick={() => handlePortalClick('experience')}
            />

            {/* Row 2 portals */}
            <Portal
              position={[-1.6, -1.4, 0]}
              label="About"
              color="#f59e0b"
              onClick={() => handlePortalClick('about')}
            />
            <Portal
              position={[1.6, -1.4, 0]}
              label="Contact"
              color="#ef4444"
              onClick={() => handlePortalClick('contact')}
            />
          </SceneCanvas>
        </MobileFallback>
      </div>
    </SectionTransition>
  )
}
