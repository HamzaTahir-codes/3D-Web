import './style.css'
import './app.js'

document.querySelector('#app').innerHTML = `
  <div class="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
    <h1 class="text-6xl font-bold text-white drop-shadow-lg select-none opacity-20">Portfolio</h1>
    <div id="ui-layer" class="pointer-events-auto"></div>
  </div>
`
