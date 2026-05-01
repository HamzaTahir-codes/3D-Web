import { stateManager } from '../core/StateManager';

export function initTerminalUI(container) {
  const terminal = document.createElement('div');
  terminal.className = "fixed bottom-8 left-8 right-8 md:right-auto md:w-96 bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-lg font-mono text-sm text-blue-400 z-50 transition-all duration-300 hover:border-blue-500/50 shadow-2xl";
  
  terminal.innerHTML = `
    <div class="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
      <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
      <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
      <span class="text-[10px] text-white/40 ml-2 uppercase tracking-widest">System Terminal</span>
    </div>
    <div id="terminal-content" class="space-y-1 h-32 overflow-y-auto mb-2 scrollbar-hide">
      <p class="text-white/60">> System Initialized...</p>
      <p class="text-white/60">> Welcome, Guest.</p>
      <p class="text-white/60">> Identity: [Hamza Tahir]</p>
      <p class="text-white/60">> Role: [Creative Developer]</p>
      <p class="text-blue-300">> Available commands: projects, skills, experience, about, contact</p>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-green-400">λ</span>
      <input type="text" id="terminal-input" class="bg-transparent border-none outline-none text-white w-full" placeholder="type a command..." autofocus>
    </div>
  `;

  container.appendChild(terminal);

  const input = terminal.querySelector('#terminal-input');
  const content = terminal.querySelector('#terminal-content');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';
      
      const p = document.createElement('p');
      p.className = "text-white/40";
      p.textContent = `> ${command}`;
      content.appendChild(p);

      handleCommand(command, content);
      content.scrollTop = content.scrollHeight;
    }
  });

  return terminal;
}

function handleCommand(cmd, content) {
  const validCommands = ['projects', 'skills', 'experience', 'about', 'contact'];
  
  if (validCommands.includes(cmd)) {
    const p = document.createElement('p');
    p.className = "text-green-400";
    p.textContent = `> Navigating to ${cmd}...`;
    content.appendChild(p);
    
    stateManager.setState({ currentScene: cmd, activeSection: cmd });
  } else if (cmd === 'help') {
    const p = document.createElement('p');
    p.className = "text-yellow-400";
    p.textContent = `> Commands: ${validCommands.join(', ')}`;
    content.appendChild(p);
  } else {
    const p = document.createElement('p');
    p.className = "text-red-400";
    p.textContent = `> Error: Command '${cmd}' not recognized.`;
    content.appendChild(p);
  }
}
