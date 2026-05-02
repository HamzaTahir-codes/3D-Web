import { create } from 'zustand'

export const useSceneStore = create((set) => ({
  activeSection: 'home',
  isTransitioning: false,
  isMobile: window.innerWidth < 768,
  lowPerformanceMode: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setTransitioning: (val) => set({ isTransitioning: val }),
  setLowPerformanceMode: (val) => set({ lowPerformanceMode: val }),
}))
