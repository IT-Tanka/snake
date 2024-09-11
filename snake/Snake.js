export default class Snake {
    constructor(game) {
        this.game = game;
        this.body = [{ x: 200, y: 200 }];
        this.direction = { x: 0, y: -this.game.gridSize };
        this.newSegments = 0;
        this.graphics = new PIXI.Graphics();
        this.game.app.stage.addChild(this.graphics);
        this.canChangeDirection = true;  
    }

    init() {
        document.addEventListener('keydown', this.changeDirection.bind(this));
    }

    changeDirection(event) {
        if (!this.canChangeDirection) return;  
    
        switch (event.key) {
            case 'ArrowUp':
                if (this.direction.y === 0 || (this.body.length === 1 && this.direction.y !== -this.game.gridSize)) {
                    this.direction = { x: 0, y: -this.game.gridSize };
                    this.canChangeDirection = false; 
                }
                break;
            case 'ArrowDown':
                if (this.direction.y === 0 || (this.body.length === 1 && this.direction.y !== this.game.gridSize)) {
                    this.direction = { x: 0, y: this.game.gridSize };
                    this.canChangeDirection = false;
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x === 0 || (this.body.length === 1 && this.direction.x !== -this.game.gridSize)) {
                    this.direction = { x: -this.game.gridSize, y: 0 };
                    this.canChangeDirection = false;
                }
                break;
            case 'ArrowRight':
                if (this.direction.x === 0 || (this.body.length === 1 && this.direction.x !== this.game.gridSize)) {
                    this.direction = { x: this.game.gridSize, y: 0 };
                    this.canChangeDirection = false;
                }
                break;
        }
    }
        
    move() {
        const newHead = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newHead);

        if (this.newSegments > 0) {
            this.newSegments--;
        } else {
            this.body.pop();
        }

        this.draw();
        this.canChangeDirection = true; 
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(0x00ff00);
        this.body.forEach(segment => {
            this.graphics.drawRect(segment.x, segment.y, this.game.gridSize, this.game.gridSize);
        });
        this.graphics.endFill();
    }

    collidesWith(position) {
        return this.body[0].x === position.x && this.body[0].y === position.y;
    }

    isDead() {
        const head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return head.x - 20 < 0 || head.x + 20 >= this.game.app.screen.width || head.y - 20 < 0 || head.y + 20>= this.game.app.screen.height;
    }

    wrapAround() {
        const head = this.body[0];
        if (head.x < 0) head.x = this.game.app.screen.width - this.game.gridSize;
        if (head.x >= this.game.app.screen.width) head.x = 0;
        if (head.y < 0) head.y = this.game.app.screen.height - this.game.gridSize;
        if (head.y >= this.game.app.screen.height) head.y = 0;
    }

    grow() {
        this.newSegments += 1;
    }

    teleportTo(position) {
        const head = this.body[0]; 
        const dx = position.x - head.x; 
        const dy = position.y - head.y; 
        this.body = this.body.map(segment => ({
            x: segment.x + dx,
            y: segment.y + dy
        }));
    
        this.canChangeDirection = false;
        setTimeout(() => {
            this.canChangeDirection = true;
        }, 100); 
    
        this.draw(); 
    }
    
    
}

