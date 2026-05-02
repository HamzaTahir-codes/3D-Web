import Home from './sections/Home';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import About from './sections/About';
import Contact from './sections/Contact';
import { useGLTF } from '@react-three/drei'

useGLTF.preload('/src/assets/models/gaming_laptop.glb')


function App() {
  return (
    <main>
      <Home />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}

export default App;
