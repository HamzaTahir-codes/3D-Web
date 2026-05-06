import { useState, useEffect } from 'react'
import SceneCanvas from '../components/three/SceneCanvas'
import ProjectCard from '../components/three/ProjectCard'
import Particles from '../components/three/Particles'
import ProjectDetail from '../components/ui/ProjectDetail'
import SpiralExperience from '../components/ui/SpiralExperience'
import SectionTransition from '../components/ui/SectionTransition'
import MobileFallback from '../components/ui/MobileFallback'
import SectionHeader from '../components/ui/SectionHeader'
import { getFeaturedProjects } from '../api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeProject, setActiveProject] = useState(null)
  const [workflowProject, setWorkflowProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getFeaturedProjects()
      .then((res) => {
        setProjects(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load projects.')
        setLoading(false)
      })
  }, [])

  const positions = [
    [-3.2, 0, 0],
    [0, 0, 0],
    [3.2, 0, 0],
  ]

  const handleCardClick = (project) => {
    setActiveProject(
      activeProject?.id === project.id ? null : project
    )
  }

  return (
    <SectionTransition id="projects">
      <div
        id="projects"
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          position: 'relative',
          overscrollBehavior: 'contain',
        }}
      >
        <SectionHeader
          title="Projects"
          subtitle="click a card to explore — ⚡ to see how it was built"
        />

        <MobileFallback>
          {loading && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
              color: '#444',
              fontSize: '13px',
            }}>
              loading projects...
            </div>
          )}

          {error && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'monospace',
              color: '#ef4444',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          {!loading && !error && (
            <SceneCanvas
              camera={{
                position: [0, activeProject ? 1.8 : 0, 7],
                fov: 70,
                near: 0.1,
                far: 1000,
              }}
            >
              <Particles count={60} />
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  position={positions[index] || [index * 3.2 - 3.2, 0, 0]}
                  title={project.title}
                  shortDescription={project.short_description}
                  category={project.category}
                  techStack={project.tech_stack}
                  liveUrl={project.live_url}
                  isActive={activeProject?.id === project.id}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </SceneCanvas>
          )}
        </MobileFallback>

        {activeProject && !workflowProject && (
          <ProjectDetail
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onExplore={() => setWorkflowProject(activeProject)}
          />
        )}

        {workflowProject && (
          <SpiralExperience
            project={workflowProject}
            onClose={() => setWorkflowProject(null)}
          />
        )}
      </div>
    </SectionTransition>
  )
}
