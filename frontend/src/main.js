import './style.css'
import { SceneManager } from './core/SceneManager'

document.querySelector('#app').innerHTML = `
  <div class="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
    <h1 class="text-6xl font-bold text-white drop-shadow-lg select-none">Portfolio</h1>
    <p class="text-xl text-blue-400 mt-4 select-none">3D Experience System Initialized</p>
  </div>
`

const sceneManager = new SceneManager(document.body)

// Handle cleanup on hot reload if necessary (Vite)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    sceneManager.dispose()
  })
}
