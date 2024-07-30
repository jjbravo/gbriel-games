import { Scene } from "phaser";



export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(712,384, 'background');

        this.add.rectangle(612,380, 468, 32).setStrokeStyle(1, 0xe7730f);

        const bar = this.add.rectangle(612-230, 380, 4, 28, 0xe7730f);
        this.load.on('progress',(progress: number) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        this.load.image('background', 'assets/game-one/background.png');
        this.load.image('box', 'assets/game-one/box.png');
        this.load.image('clouds','assets/game-one/cloud.svg')
        this.load.image('letterA','assets/game-one/a.png')
        this.load.image('letterE','assets/game-one/e.png')
        this.load.image('letterI','assets/game-one/i.png')
        this.load.image('letterO','assets/game-one/o.png')
        this.load.image('letterU','assets/game-one/u.png')
        this.load.audio('theme-sound','assets/game-one/sounds/theme.mp3');
        this.load.audio('coin-sound','assets/game-one/sounds/coin.mp3');
    }

    create() {
        this.scene.start('MainGame')
    }
}