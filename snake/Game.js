import Snake from './Snake.js';
import Food from './Food.js';
import Wall from './Wall.js'; 

export default class Game {
    constructor(app) {
        this.app = app;
        this.gridSize = 20;
        this.fieldSize = 20;
        this.snake = null;
        this.food = null;
        this.extrafood = null;
        this.score = 0;
        this.bestScore = 0;
        this.gameAnimationFrameId = null;
        this.lastUpdate = Date.now();
        this.updateInterval = 0;
        this.mode = 'Classic';
        this.walls = [];
        this.drawBorder();
    }

    init(mode) {
        this.mode = mode; 
        this.updateInterval = 300;
        this.reset();
        this.snake = new Snake(this);
        this.extrafood=(this.mode==='Portal')?new Food(this):'';
        this.food = new Food(this);
        this.snake.init();
        this.gameLoop();
    }

    reset() {
        if (this.snake) this.snake.graphics.clear();
        if (this.food) this.food.sprite.clear();
        if (this.extrafood) this.extrafood.sprite.clear();
        this.snake = null;
        this.food = null;
        this.extrafood = null;
        this.walls.forEach(wall => wall.graphics.clear());
        this.walls = [];
        this.score = 0;
        document.getElementById('current-score').textContent = this.score;
        document.getElementById('best-score').textContent = this.bestScore;
    }

    gameLoop() {
        const now = Date.now();
        if (now - this.lastUpdate > this.updateInterval) {
            this.lastUpdate = now;
            this.snake.move();
    
            if (this.mode === 'Portal') {
                if (this.snake.collidesWith(this.food.position)) {
                    this.snake.teleportTo(this.extrafood.position); 
                    this.food.updatePosition(); 
                    this.snake.grow();
                    this.updateScore();
                } else if (this.snake.collidesWith(this.extrafood.position)) {
                    this.snake.teleportTo(this.food.position); 
                    this.extrafood.updatePosition(); 
                    this.snake.grow();
                    this.updateScore();
                }
            } else {
                if (this.snake.collidesWith(this.food.position)) {
                    this.snake.grow();
                    this.food.updatePosition();
                    this.updateScore();
    
                    if (this.mode === 'Walls') {
                        this.addWall();
                    }
    
                    if (this.mode === 'Speed') {
                        this.updateInterval *= 0.9;
                    }
                }
            }
    
            if (this.walls.some(wall => this.snake.collidesWith(wall.position))) {
                document.getElementById('game-modes').disabled = false;
                alert('Game Over!');
                return;
            }
    
            if (this.snake.isDead() && this.mode !== 'NoDie') {
                document.getElementById('game-modes').disabled = false;
                alert('Game Over!');
                return;
            }
    
            if (this.mode === 'NoDie') {
                this.snake.wrapAround();
            }
        }
    
        this.gameAnimationFrameId = requestAnimationFrame(() => this.gameLoop());
    }
    
    updateScore() {
        this.score += 10;
        document.getElementById('current-score').textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            document.getElementById('best-score').textContent = this.bestScore;
        }
    }

    addWall() {
        const wall = new Wall(this);
        this.walls.push(wall);
        wall.draw();
    }
    drawBorder() {
        const gridSize = this.gridSize;
        const fieldSize = this.fieldSize * gridSize;
        this.border = new PIXI.Graphics();
        this.border.lineStyle(40, 0xFFA500); 
        this.border.drawRect(0, 0, fieldSize, fieldSize);
        this.app.stage.addChild(this.border);
    }
}
