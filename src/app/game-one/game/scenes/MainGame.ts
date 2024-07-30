import { Scene } from "phaser";


export class MainGame extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    boxOne: Phaser.GameObjects.Image;

    constructor(){
        super('MainGame');
    }

    
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(712,384, 'background');
        this.background.setAlpha(0.9);

        this.boxOne = this.add.image(650,650,'box')

        this.sound.add("theme-sound");
        this.sound.play("theme-sound", {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
    }
}