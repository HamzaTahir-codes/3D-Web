const TWO_PI = Math.PI * 2

function spiralPoint(turn, radius) {
  const angle = turn * TWO_PI - Math.PI / 2
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0,
  ]
}

export const spiralPhases = [
  {
    id: 1,
    phase: 'Client Approaches',
    color: '#7f77dd',
    position: spiralPoint(0.0, 0.6),
    icon: '◎',
    lines: [
      'A client arrives with a problem.',
      'They have a vision — unclear, ambitious.',
      '"I need something built."',
      'This is where every project begins.',
    ],
  },
  {
    id: 2,
    phase: 'Requirements',
    color: '#1d9e75',
    position: spiralPoint(0.18, 1.5),
    icon: '▣',
    lines: [
      'We listen before we build.',
      'What is the core problem?',
      'Who are the users?',
      'What does success look like?',
      'Scope defined. Constraints mapped.',
    ],
  },
  {
    id: 3,
    phase: 'Planning & Design',
    color: '#ef9f27',
    position: spiralPoint(0.36, 2.4),
    icon: '◈',
    lines: [
      'Architecture takes shape.',
      'Database schema. API contracts.',
      'Tech stack selected for the problem.',
      'The system exists on paper first.',
    ],
  },
  {
    id: 4,
    phase: 'Development',
    color: '#378add',
    position: spiralPoint(0.55, 3.2),
    icon: '◆',
    lines: [
      'Code meets reality.',
      'Models. Views. Controllers.',
      'Frontend wired to backend.',
      'Features ship one by one.',
    ],
  },
  {
    id: 5,
    phase: 'Testing & Iteration',
    color: '#e24b4a',
    position: spiralPoint(0.74, 4.0),
    icon: '◉',
    lines: [
      'Break it before the client does.',
      'Edge cases hunted down.',
      'Performance measured.',
      'The spiral loops — refine and repeat.',
    ],
  },
  {
    id: 6,
    phase: 'Deployment',
    color: '#639922',
    position: spiralPoint(0.92, 4.8),
    icon: '★',
    lines: [
      'The system goes live.',
      'Real users. Real data.',
      'Monitored. Maintained. Improved.',
      'The project lives in the world.',
    ],
  },
]

export const getProjectContext = (category) => ({
  fullstack: {
    stack: ['Python', 'Django', 'REST API', 'JavaScript', 'SQLite'],
  },
  iot: {
    stack: ['ESP32', 'C', 'FreeRTOS', 'WebSockets', 'Django'],
  },
  mobile: {
    stack: ['.NET MAUI', 'C#', 'REST API', 'SQLite'],
  },
  other: {
    stack: ['Python', 'Django', 'JavaScript'],
  },
})
