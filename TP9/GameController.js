class GameController {
  constructor() {
    this.game = new Game();
    this.gameView = new GameView(this.game);
    this.username = localStorage.getItem("username");
    this.link = localStorage.getItem("link");
    this.skinPath = localStorage.getItem("skin");

    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.link);

    this.initInput();
    this.initSocket();

    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.lastUpdate = performance.now();

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("connected to server");
      this.socket.send(
        JSON.stringify({ name: this.username, skinPath: this.skinPath }),
      );
      this.startInputSender();
    };
    this.socket.onmessage = (element) => {
      this.game.update(JSON.parse(element.data));
      this.lastUpdate = performance.now();
    };
  }

  initInput() {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "z") this.inputState.up = true;
      if (e.key.toLowerCase() === "s") this.inputState.down = true;
      if (e.key.toLowerCase() === "q") this.inputState.left = true;
      if (e.key.toLowerCase() === "d") this.inputState.right = true;
      if (e.key.toLowerCase() === "p") this.inputState.attack = true;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "z") this.inputState.up = false;
      if (e.key.toLowerCase() === "s") this.inputState.down = false;
      if (e.key.toLowerCase() === "q") this.inputState.left = false;
      if (e.key.toLowerCase() === "d") this.inputState.right = false;
      if (e.key.toLowerCase() === "p") this.inputState.attack = false;
    });
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN)
        this.socket.send(
          JSON.stringify({ type: "input", input: this.inputState }),
        );
      else return;
    }, this.SERVER_INTERVAL);
  }

  // === Main render loop ===
  loop(timestamp) {
    // Request the next frame

    this.gameView.createImg();
    let alpha = Math.min(
      (timestamp - this.lastUpdate) / this.SERVER_INTERVAL,
      1,
    );

    for (let element in this.game.players)
      this.game.players[element].interpolate(alpha);
    requestAnimationFrame(this.loop);

    this.gameView.render();
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
