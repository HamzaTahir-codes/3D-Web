const pos = (index) => {
  const total = 7
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 3.6
  return [
    parseFloat((Math.cos(angle) * radius).toFixed(3)),
    parseFloat((Math.sin(angle) * radius).toFixed(3)),
    0,
  ]
}

export const skills = [
  {
    id: 1,
    name: 'Python',
    type: 'snake',
    color: '#1d9e75',
    position: pos(0),
    story: 'Python is how I think. My primary language for backend systems, IoT data pipelines, firmware tooling, and AI integration.',
    years: '3+ years',
    used_for: ['Django', 'REST APIs', 'Scripting', 'IoT pipelines', 'AI tools'],
  },
  {
    id: 2,
    name: 'Embedded Systems',
    type: 'circuit',
    color: '#ef9f27',
    position: pos(1),
    story: 'I write firmware for ESP32 microcontrollers in C with FreeRTOS — designing stable sensor reads, communication protocols, and memory-efficient task scheduling.',
    years: '2+ years',
    used_for: ['ESP32', 'C', 'FreeRTOS', 'Firmware', 'Microcontrollers'],
  },
  {
    id: 3,
    name: 'Django & DRF',
    type: 'atom',
    color: '#7f77dd',
    position: pos(2),
    story: 'Django is the core of my backend work — scalable REST APIs, admin dashboards, real-time WebSocket systems, and full-stack web applications.',
    years: '2+ years',
    used_for: ['REST APIs', 'Admin dashboards', 'WebSockets', 'ORM', 'Full-stack'],
  },
  {
    id: 4,
    name: 'Web Frontend',
    type: 'nodes',
    color: '#f0c040',
    position: pos(3),
    story: 'JavaScript powers my frontend work — from vanilla DOM manipulation and AJAX to jQuery-driven dynamic UIs and real-time WebSocket clients.',
    years: '3+ years',
    used_for: ['JavaScript', 'jQuery', 'AJAX', 'WebSockets', 'DOM'],
  },
  {
    id: 5,
    name: 'Gen AI',
    type: 'neural',
    color: '#d4537e',
    position: pos(4),
    story: 'I integrate Generative AI into most of my workflows — LLMs for code generation, documentation, and building AI-assisted tools and pipelines.',
    years: '1+ years',
    used_for: ['LLM integration', 'Prompt engineering', 'AI tools', 'Documentation'],
  },
  {
    id: 6,
    name: '.NET MAUI',
    type: 'phone',
    color: '#378add',
    position: pos(5),
    story: '.NET MAUI is my cross-platform mobile framework. Single C# codebase that runs on both Android and iOS with native performance.',
    years: '1+ years',
    used_for: ['.NET MAUI', 'C#', 'Android', 'iOS', 'Cross-platform'],
  },
  {
    id: 7,
    name: 'DevOps & Tooling',
    type: 'gear',
    color: '#888780',
    position: pos(6),
    story: 'Git is my daily driver for version control. I use basic CI/CD pipelines to automate testing and deployment workflows.',
    years: '3+ years',
    used_for: ['Git', 'CI/CD', 'Version control', 'Deployment'],
  },
]
