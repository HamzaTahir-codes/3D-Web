export class NavigationSystem {
  constructor(sceneManager, stateManager) {
    this.sceneManager = sceneManager;
    this.stateManager = stateManager;
    
    this.sceneMap = {
      home: null, // To be filled with actual scene classes
      projects: null,
      skills: null,
      experience: null,
      about: null,
      contact: null
    };

    this.stateManager.subscribe((state) => this.onStateChange(state));
  }

  registerScene(name, SceneClass) {
    this.sceneMap[name] = SceneClass;
  }

  async onStateChange(state) {
    if (this.currentSceneName !== state.currentScene) {
      this.currentSceneName = state.currentScene;
      const SceneClass = this.sceneMap[state.currentScene];
      if (SceneClass) {
        await this.sceneManager.loadScene(SceneClass);
      }
    }
  }
}
