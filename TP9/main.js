import GameController from "./Controller/GameController.js";
import Game from "./Model/Game.js";
import GameView from "./View/GameView.js";

const game = new Game();
const gameView = new GameView(game);
const gameController = new GameController(game, gameView);
