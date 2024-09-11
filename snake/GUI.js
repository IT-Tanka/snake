export default class GUI {
    constructor(game) {
        this.game = game;
        this.playButton = document.getElementById('play-button');
        this.exitButton = document.getElementById('exit-button');
        this.menuButton = document.getElementById('menu-button');
        this.gameModes = document.querySelectorAll('input[name="mode"]');
    }

    init() {
        this.playButton.addEventListener('click', () => this.startGame());
        this.exitButton.addEventListener('click', () => this.exitGame());
        this.menuButton.addEventListener('click', () => this.showMenu());
    }

    startGame() {
        this.playButton.style.display = 'none';
        this.exitButton.style.display = 'none';
        this.menuButton.style.display = 'inline';
        
        const selectedMode = Array.from(this.gameModes).find(radio => radio.checked).value;
        this.game.init(selectedMode);
        document.getElementById('game-modes').disabled = true;
    }

    exitGame() {
        if (this.game.gameAnimationFrameId) {
            cancelAnimationFrame(this.game.gameAnimationFrameId);
        }

        this.game.reset();

        this.exitButton.style.display = 'inline';
        this.menuButton.style.display = 'none';
        this.playButton.style.display = 'inline';
        document.getElementById('game-modes').disabled = false;
    }

    showMenu() {
        this.playButton.style.display = 'inline';
        this.exitButton.style.display = 'inline';
        this.menuButton.style.display = 'none';
    }

}
