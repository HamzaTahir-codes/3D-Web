import { stateManager } from '../core/StateManager';

export function initTooltip(container) {
  const tooltip = document.createElement('div');
  tooltip.id = "custom-tooltip";
  tooltip.className = "fixed pointer-events-none z-50 opacity-0 transition-opacity duration-200 flex flex-col items-center";
  
  tooltip.innerHTML = `
    <div class="bg-blue-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl border border-white/30 flex items-center justify-center min-w-[80px]">
      <span id="tooltip-text"></span>
    </div>
    <div class="w-2 h-2 bg-blue-600/90 rotate-45 -mt-1 border-r border-b border-white/30"></div>
  `;

  container.appendChild(tooltip);

  const textSpan = tooltip.querySelector('#tooltip-text');

  stateManager.subscribe((state) => {
    if (state.hoveredSection && state.hoveredPosition) {
      textSpan.textContent = state.hoveredSection;
      tooltip.style.opacity = "1";
      tooltip.style.left = `${state.hoveredPosition.x}px`;
      tooltip.style.top = `${state.hoveredPosition.y - 60}px`;
      tooltip.style.transform = `translateX(-50%)`;
    } else {
      tooltip.style.opacity = "0";
    }
  });

  return tooltip;
}
