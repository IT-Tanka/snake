export default class Wall {
    constructor(game) {
        this.game = game;
        let pos_x=Math.floor(Math.random() * this.game.fieldSize) * this.game.gridSize;
        if (pos_x<20) pos_x=20;if (pos_x>340) pos_x=340;
        let pos_y=Math.floor(Math.random() * this.game.fieldSize) * this.game.gridSize;
        if (pos_y<20) pos_y=20;if (pos_y>340) pos_y=340;
        this.position = {
            x:pos_x,
            y:pos_y
        };
        this.graphics = new PIXI.Graphics();
    }

    draw() {
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(this.position.x, this.position.y, this.game.gridSize, this.game.gridSize);
        this.graphics.endFill();
        this.game.app.stage.addChild(this.graphics);
    }
}
