import { create } from 'zustand'

const getIsMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < 768

export const useSceneStore = create((set) => ({
  activeSection: 'home',
  isTransitioning: false,
  isMobile: getIsMobile(),
  lowPerformanceMode: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setTransitioning: (val) => set({ isTransitioning: val }),
  setLowPerformanceMode: (val) => set({ lowPerformanceMode: val }),
}))
