import { Scene } from "phaser";


export class MainGame extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    boxOne: Phaser.Physics.Arcade.Image;
    clouds: Phaser.GameObjects.Image;
    letterA: Phaser.Physics.Arcade.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    letterE: Phaser.Physics.Arcade.Image;
    collisionsCountA: number;

    constructor(){
        super('MainGame');
        this.collisionsCountA = 0;
    }

    
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.physics.world.setBoundsCollision(true, true, true, false);

        const randomX = Phaser.Math.Between(0, this.scale.width);

        this.background = this.add.image(712,384, 'background');
        this.background.setAlpha(0.9);
        this.clouds = this.add.image(650,100,'clouds');

        this.letterA = this.physics.add.image(randomX, 0, 'letterA');
        this.letterA.setCollideWorldBounds(true);
        this.letterA.setBounce(0.5);

        const randomXe = Phaser.Math.Between(0, this.scale.width);
        this.letterE = this.physics.add.image(randomXe, 0, 'letterE');
        this.letterE.setCollideWorldBounds(true);
        this.letterE.setBounce(0.5);
        this.letterE.setVisible(false);
        this.letterE.setActive(false);

        this.boxOne = this.physics.add.image(this.scale.width / 2, this.scale.height - 200, 'box');
        this.boxOne.setImmovable(true);
        this.boxOne.setCollideWorldBounds(true);


        this.physics.add.collider(this.letterA, this.boxOne, this.handlerCollision, () => true, this);

        this.physics.add.collider(this.letterE, this.boxOne, this.handlerCollision, () => true, this);

        this.cursors = this.input.keyboard?.createCursorKeys();
        this.addSoundBackground();
     
    }

    override update() {
        this.letterA.setVelocityY(100);

        if(this.letterA.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterA.setPosition(randomX, 0);
            this.letterA.body!.velocity.y = 0;
        }

        if(this.letterE.active) {
            this.letterE.setVelocityY(150);
        }


        if(this.letterE.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterE.setPosition(randomX, 0);
            this.letterE.body!.velocity.y = 0;
        }

        if(this.cursors?.left.isDown) {
            this.boxOne.setVelocityX(-300);
        } else if(this.cursors?.right.isDown) {
            this.boxOne.setVelocityX(300);
        } else {
            this.boxOne.setAccelerationX(0);
        }
    }

    private handlerCollision(letter: any) {
        this.addCoinSound();
        this.collisionsCountA +=1;
        letter.setVelocityY(100);
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);

        if(this.collisionsCountA > 5) {
            this.letterE.setVisible(true);
            this.letterE.setActive(true);
        }
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
    private addCoinSound() {
        this.sound.add("coin-sound");
        this.sound.play("coin-sound", {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });
    }
}