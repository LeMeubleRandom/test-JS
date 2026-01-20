class Game {
  constructor() {
    this.isRunning = false;
    this.timer = 0;
    this.players = {};
    this.isOver = false;
  }

  async update(gsfs) {
    const tabId = Object.keys(gsfs.players);
    const localTabId = Object.keys(this.players);

    console.log("serv\n", tabId, "\n\nlocal\n", localTabId);

    this.isRunning = gsfs.isRunning;
    this.timer = gsfs.timer;
    this.isOver = gsfs.isOver;

    tabId.forEach((element) => {
      const check = localTabId.includes(element) ? true : false;
      if (!check)
        this.players[element] = new Player(
          element,
          gsfs.players[element].name,
          gsfs.players[element].skinPath,
          gsfs.players[element].position,
        );
    });

    localTabId.forEach((element) => {
      const check = tabId.includes(element) ? true : false;
      if (!check) delete this.players[element];
    });

    tabId.forEach((element, index) => {
      this.players[element].updatePlayer(gsfs.players[element]);
    });
    console.log(structuredClone(this.players));
  }

  showGameState() {
    console.log(this.players);
  }
}
