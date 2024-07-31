import { Scene } from "phaser";



export class NextLevel extends Scene {

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor() {
        super('NextLevel');
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.physics.world.setBoundsCollision(true, true, true, false);
        

        this.background = this.add.image(712,384, 'background');
        this.background.setAlpha(0.9);
        
       this.gameText = this.add.text(70, 50, 'Ganaste el nivel anterior! Felicidades').setFontFamily('Arial').setFontSize(64).setColor('#ffcc00');

       this.addSoundBackground();

    }

    private addSoundBackground() {
        this.sound.add("theme-sound");
        this.sound.play("theme-sound", {
            mute: false,
            volume: 2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
    }
}