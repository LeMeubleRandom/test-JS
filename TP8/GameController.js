class GameController {
  constructor() {
    this.game = new Game();
    this.username = localStorage.getItem("username");
    this.link = localStorage.getItem("link");
    this.skin = localStorage.getItem("skin");

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
    this.startInputSender();

    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("connected to server");
      this.socket.send(
        JSON.stringify({ name: this.username, skinPath: this.skin }),
      );
    };
    this.socket.onmessage = (element) => {
      console.log("message reçu");
      this.game.update(JSON.parse(element.data));
    };
  }

  initInput() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "z") this.inputState.up = true;
      if (e.key === "s") this.inputState.down = true;
      if (e.key === "q") this.inputState.left = true;
      if (e.key === "d") this.inputState.right = true;
      if (e.key === "r") this.inputState.attack = true;
      console.log(e.key);
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "z") this.inputState.up = false;
      if (e.key === "s") this.inputState.down = false;
      if (e.key === "q") this.inputState.left = false;
      if (e.key === "d") this.inputState.right = false;
      if (e.key === "r") this.inputState.attack = false;
    });
  }

  /*startInputSender() {
    function myCallBack() {
      if (this.socket.readyState === WebSocket.OPEN)
        this.socket.send(
          JSON.stringify({ type: "input", input: this.inputState }),
        );
      else return;
    }
    setInterval(myCallBack, this.SERVER_INTERVAL);
  }*/
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
    console.log("test");
    requestAnimationFrame(this.loop);
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
