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
        this.load.image('background', 'assets/vowels/background.png');
        this.load.image('box', 'assets/vowels/box.png');
        this.load.image('clouds','assets/vowels/cloud.svg')
        this.load.image('letterA','assets/vowels/a.png')
        this.load.image('letterE','assets/vowels/e.png')
        this.load.image('letterI','assets/vowels/i.png')
        this.load.image('letterO','assets/vowels/o.png')
        this.load.image('letterU','assets/vowels/u.png')
        this.load.audio('theme-sound','assets/vowels/sounds/theme.mp3');
        this.load.audio('coin-sound','assets/vowels/sounds/coin.mp3');
    }

    create() {
        this.scene.start('MainGame')
    }
}