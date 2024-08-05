import { Scene } from "phaser";



export class NextLevelTwo extends Scene {

    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    letterAM: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    letterUM: any;
    letterOM: any;
    letterIM: any;
    letterEM: any;
    boxOne: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    countStar: number;
    countStarsText: any;
    clouds: Phaser.GameObjects.Image;
    stars: Phaser.Physics.Arcade.Group;

    collisionsCountA: number;
    collisionsCountE: number;
    collisionsCountI: number;
    collisionsCountO: number;
    collisionsCountU: number;
    level: Phaser.GameObjects.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    constructor() {
        super('NextLevelTwo');
        this.collisionsCountA = 0;
        this.collisionsCountE = 0;
        this.collisionsCountI = 0;
        this.collisionsCountO = 0;
        this.collisionsCountU = 0;
        this.countStar = 0;
    }
    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        const randomXa = Phaser.Math.Between(0, this.scale.width);
        const randomXe = Phaser.Math.Between(0, this.scale.width);
        const randomXi = Phaser.Math.Between(0, this.scale.width);
        const randomXo = Phaser.Math.Between(0, this.scale.width);
        const randomXu = Phaser.Math.Between(0, this.scale.width);

        this.background = this.add.image(0,0, 'background');
        this.background.setAlpha(0.9);
        this.background.setOrigin(0.0);
        this.background.displayWidth = this.scale.width;
        this.background.displayHeight = this.scale.height;
        
        this.level = this.add.image((this.scale.width / 2 ) - 18,this.scale.height / 2,'level_two');

       this.countStarsText = this.add.text(70, 50, '0').setFontFamily('Arial').setFontSize(64).setColor('#ffcc00');
       this.clouds = this.add.image(650,100,'clouds');
       this.add.image(30,80,'star_2');

       this.stars = this.physics.add.group({
           defaultKey: 'star',
           maxSize: 3,
           runChildUpdate: true
       });

       this.letterAM = this.physics.add.image(randomXa/2, 0, 'letterA_M');
       this.letterAM.setCollideWorldBounds(true);
       this.letterAM.setBounce(0.5);
       this.letterAM.setVisible(false);
       this.letterAM.setActive(false);

       this.letterEM = this.physics.add.image(randomXe/2, 0, 'letterE_M');
       this.letterEM.setCollideWorldBounds(true);
       this.letterEM.setBounce(0.5);
       this.letterEM.setVisible(false);
       this.letterEM.setActive(false);

       this.letterIM = this.physics.add.image(randomXi, 0, 'letterI_M');
       this.letterIM.setCollideWorldBounds(true);
       this.letterIM.setBounce(0.5);
       this.letterIM.setVisible(false);
       this.letterIM.setActive(false);

       this.letterOM = this.physics.add.image(randomXo, 0, 'letterO_M');
       this.letterOM.setCollideWorldBounds(true);
       this.letterOM.setBounce(0.5);
       this.letterOM.setVisible(false);
       this.letterOM.setActive(false);

       this.letterUM = this.physics.add.image(randomXu, 0, 'letterU_M');
       this.letterUM.setCollideWorldBounds(true);
       this.letterUM.setBounce(0.5);
       this.letterUM.setVisible(false);
       this.letterUM.setActive(false);



       this.boxOne = this.physics.add.image(this.scale.width / 2, this.scale.height - 200, 'box');
       this.boxOne.setImmovable(true);
       this.boxOne.setCollideWorldBounds(true);

        // Definicion de colisiones
        this.physics.add.collider(this.stars, this.boxOne, this.handlerCollisionStar, () => true, this);
       this.physics.add.collider(this.letterAM, this.boxOne, this.handlerCollisionAM, () => true, this);

       this.physics.add.collider(this.letterEM, this.boxOne, this.handlerCollisionEM, () => true, this);
       this.physics.add.collider(this.letterIM, this.boxOne, this.handlerCollisionIM, () => true, this);
       this.physics.add.collider(this.letterOM, this.boxOne, this.handlerCollisionOM, () => true, this);
       this.physics.add.collider(this.letterUM, this.boxOne, this.handlerCollisionUM, () => true, this);

       this.addSoundBackground();

           // Definicion de teclas de control
        this.cursors = this.input.keyboard?.createCursorKeys();
       // Tiempo de espera para iniciar grupo de estrellas
       this.time.addEvent({
        delay: 5000,
        callback: this.cleanStartLevelScreen,
        callbackScope: this,
        loop:true
    })

    }

    override update(time: number, delta: number): void
    {
        
        if(this.letterAM.active) {
            this.letterAM.setVelocityY(150);
        }
     
        if(this.letterAM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterAM.setPosition(randomX, 0);
            this.letterAM.body.velocity.y = 0;
        }

        if(this.letterEM.active) {
            this.letterEM.setVelocityY(100);
        }

        if(this.letterEM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterEM.setPosition(randomX, 0);
            this.letterEM.body.velocity.y = 0;
        }
        if(this.letterIM.active) {
            this.letterIM.setVelocityY(160);
        }

        if(this.letterIM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterIM.setPosition(randomX, 0);
            this.letterIM.body.velocity.y = 0;
        }
        if(this.letterOM.active) {
            this.letterOM.setVelocityY(120);
        }

        if(this.letterOM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterOM.setPosition(randomX, 0);
            this.letterOM.body.velocity.y = 0;
        }
        if(this.letterUM.active) {
            this.letterUM.setVelocityY(150);
        }

        if(this.letterUM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterUM.setPosition(randomX, 0);
            this.letterUM.body.velocity.y = 0;
        }


        this.stars.children.iterate((star: any, box: any) => {
            if(star){
                star.setVelocityY(100);
                star.rotation += 0.005;
        
                if(star.y > this.scale.height) {
                    const randomStar = Phaser.Math.Between(0, this.scale.width);
                    star.setPosition(randomStar, 0);
                    star.body.velocity.y = 0;
                }
                
            }
            return true;
        });

        if(this.cursors?.left.isDown) {
            this.boxOne.setVelocityX(-300);
        } else if(this.cursors?.right.isDown) {
            this.boxOne.setVelocityX(300);
        } else {
            this.boxOne.setAccelerationX(0);
        }

    }

    private handlerCollisionAM(letter: any) {
        this.addCoinSound('coin-up-sound', 0.2);
        this.addCoinSound('a-sound', 2);
        this.collisionsCountA +=1;
        letter.setVelocityY(160);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
       
    }

    private handlerCollisionEM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('e-sound',2);
        this.collisionsCountE +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
                
    }

    private handlerCollisionIM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('i-sound',2);
        this.collisionsCountI +=1;
        letter.setVelocityY(80);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);  
    }

    private handlerCollisionOM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('o-sound',2);
        this.collisionsCountO +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
    }

    private handlerCollisionUM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('u-sound',2);
        this.collisionsCountU +=1;
        letter.setVelocityY(120);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
    }

    private handlerCollisionStar(box: any, star: any, ) {
        this.addCoinSound("coin-sound", 0.5);
        this.countStar +=1;
        this.countStarsText.setText(''+this.countStar);
 
        if(this.countStar > 2 && this.collisionsCountA <= 10) {
         this.letterAM.setVisible(true);
         this.letterAM.setActive(true);
     }
         const randomXStar = Phaser.Math.Between(0, this.scale.width);
         star.setPosition(randomXStar, 0);
         star.body.velocity.y = 0; 
         star.setActive(false);
         star.setVisible(false);
     }

    private addCoinSound(keySound: string, volume: number) {
        this.sound.add(keySound);
        this.sound.play(keySound, {
            mute: false,
            volume: volume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });
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

    private cleanStartLevelScreen() {
        this.level.setActive(false);
        this.level.setVisible(false);
        this.spawnStar();
    }

    private spawnStar() {
        let star = this.stars.getFirstDead(true, Phaser.Math.Between(0, this.scale.width), 0, 'star');

        if (star) {

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            this.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });

            star.setActive(true);
            star.setVisible(true);
            star.setCollideWorldBounds(true);
            star.setBounce(0.5);
            star.setOrigin(0.5, 0.5); // Establece el punto de anclaje de la estrella en su centro
            star.setVelocityY(100); // Ajusta el valor para cambiar la velocidad de caída
            star.angle = 0; // Reinicia el ángulo de rotación
        }
    }
}