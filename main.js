import Game from './snake/Game.js';  
import GUI from './snake/GUI.js';  

let app = new PIXI.Application({ width: 400, height: 400 });
document.getElementById('game-container').appendChild(app.view);

const game = new Game(app);
const gui = new GUI(game);

gui.init();
