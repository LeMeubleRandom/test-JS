// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./assets/3.png",
      position: [0.5600000000000003, 0.17999999999999977],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 3,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
    "28ead291-fcea-4b41-a596-d3c876c49a53": {
      name: "bloublou",
      skinPath: "./assets/4.png",
      position: [0.44, 0.19],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 0,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

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
      if (!check) {
        this.players[element] = new Player(
          element,
          gsfs.players[element].name,
          gsfs.players[element].skinPath,
          gsfs.players[element].position,
        );
      }
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

let game = new Game(
  backendData.isRunning,
  backendData.timer,
  (players = {
    gfezvfsd: {},
  }),
);

game.update(backendData);

backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].lvl = 10;
game.update(backendData);

console.log("==========Instance de la Game 1==========");

const game1 = new Game();
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========MetaData Test==========");
backendData.isOver = true;
backendData.timer = 192;
backendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"].name =
  "MetaDataTEST";
backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp = 2;
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========AddPlayer Test==========");
const newPlayer = "new-player-666";

backendData.players[newPlayer] = {
  name: "Le Petit Nouveau",
  skinPath: "./assets/1.png",
  position: [0.5, 0.5],
  lvl: 1,
  hp: 100,
  maxHp: 100,
  hpRegenRate: 10,
  speed: 0.2,
  direction: 1,
  isAttacking: false,
  isWalking: true,
  isDying: false,
  attackCooldown: 1,
  currentAttackCooldown: 0,
};

game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========DeletePlayer Test==========");

delete backendData.players[newPlayer];
game1.update(backendData);
console.log(structuredClone(game1));
