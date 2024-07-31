import { Scene } from "phaser";


export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('background', 'assets/vowels/background.png');
    }

    create() {
        this.scene.start('Preloader');
    }
}