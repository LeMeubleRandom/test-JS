import Player from "./Player.js";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.timer = 0;
    this.players = {};
    this.isOver = false;
  }

  async update(gsfs) {
    const tabId = Object.keys(gsfs.players);
    const localTabId = Object.keys(this.players);

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

    tabId.forEach((element) => {
      this.players[element].updatePlayer(gsfs.players[element]);
    });
  }

  showGameState() {
    console.log(this.players);
  }
}
