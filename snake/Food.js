export default class Food {
    constructor(game) {
        this.game = game;
        this.position = { x: 40, y: 40 };
        this.sprite = new PIXI.Graphics();
        this.updatePosition();
        this.game.app.stage.addChild(this.sprite);
    }

    updatePosition() {
        let pos_x=Math.floor(Math.random() * this.game.fieldSize) * this.game.gridSize;
        if (pos_x<20) pos_x=20;if (pos_x>340) pos_x=340;
        let pos_y=Math.floor(Math.random() * this.game.fieldSize) * this.game.gridSize;
        if (pos_y<20) pos_y=20;if (pos_y>340) pos_y=340;
        this.position = {
            x:pos_x,
            y:pos_y
        };
        this.draw();
    }

    draw() {
        this.sprite.clear();
        this.sprite.beginFill(0xff0000);
        this.sprite.drawRect(this.position.x, this.position.y, this.game.gridSize, this.game.gridSize);
        this.sprite.endFill();
    }
}

