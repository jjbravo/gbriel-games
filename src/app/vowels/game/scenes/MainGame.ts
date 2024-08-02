import { GameObjects, Scene } from "phaser";


export class MainGame extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    boxOne: Phaser.Physics.Arcade.Image;
    clouds: Phaser.GameObjects.Image;
    letterA: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    letterE: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    countStar: number;
    stars: Phaser.Physics.Arcade.Group;
    countStarsText: GameObjects.Text;
    letterI: any;
    letterO: any;
    letterU: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    collisionsCountA: number;
    collisionsCountE: number;
    collisionsCountI: number;
    collisionsCountO: number;
    collisionsCountU: number;
    letterAM: any;
    letterEM: any;
    letterIM: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    letterOM: any;
    letterUM: any;

    constructor(){
        super('MainGame');
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
        

        this.background = this.add.image(0,0, 'background');
        this.background.setAlpha(0.9);
        this.background.setOrigin(0.0);
        this.background.displayWidth = this.scale.width;
        this.background.displayHeight = this.scale.height;

        this.countStarsText = this.add.text(70, 50, '0').setFontFamily('Arial').setFontSize(64).setColor('#ffcc00');
        this.clouds = this.add.image(650,100,'clouds');
        this.add.image(30,80,'star_2');

        this.stars = this.physics.add.group({
            defaultKey: 'star',
            maxSize: 3,
            runChildUpdate: true
        });

        const randomXa = Phaser.Math.Between(0, this.scale.width);
        const randomXe = Phaser.Math.Between(0, this.scale.width);
        const randomXi = Phaser.Math.Between(0, this.scale.width);
        const randomXo = Phaser.Math.Between(0, this.scale.width);
        const randomXu = Phaser.Math.Between(0, this.scale.width);

        // Definicion de objetos con fisica de movimiento
        this.letterA = this.physics.add.image(randomXa, 0, 'letterA');
        this.letterA.setCollideWorldBounds(true);
        this.letterA.setBounce(0.5);
        this.letterA.setVisible(false);
        this.letterA.setActive(false);
        this.letterAM = this.physics.add.image(randomXa/2, 0, 'letterA_M');
        this.letterAM.setCollideWorldBounds(true);
        this.letterAM.setBounce(0.5);
        this.letterAM.setVisible(false);
        this.letterAM.setActive(false);

        this.letterE = this.physics.add.image(randomXe, 0, 'letterE');
        this.letterE.setCollideWorldBounds(true);
        this.letterE.setBounce(0.5);
        this.letterE.setVisible(false);
        this.letterE.setActive(false);
        this.letterEM = this.physics.add.image(randomXe/2, 0, 'letterE_M');
        this.letterEM.setCollideWorldBounds(true);
        this.letterEM.setBounce(0.5);
        this.letterEM.setVisible(false);
        this.letterEM.setActive(false);

        this.letterI = this.physics.add.image(randomXi, 0, 'letterI');
        this.letterI.setCollideWorldBounds(true);
        this.letterI.setBounce(0.5);
        this.letterI.setVisible(false);
        this.letterI.setActive(false);
        this.letterIM = this.physics.add.image(randomXi, 0, 'letterI_M');
        this.letterIM.setCollideWorldBounds(true);
        this.letterIM.setBounce(0.5);
        this.letterIM.setVisible(false);
        this.letterIM.setActive(false);

        this.letterO = this.physics.add.image(randomXo, 0, 'letterO');
        this.letterO.setCollideWorldBounds(true);
        this.letterO.setBounce(0.5);
        this.letterO.setVisible(false);
        this.letterO.setActive(false);
        this.letterOM = this.physics.add.image(randomXo, 0, 'letterO_M');
        this.letterOM.setCollideWorldBounds(true);
        this.letterOM.setBounce(0.5);
        this.letterOM.setVisible(false);
        this.letterOM.setActive(false);

        this.letterU = this.physics.add.image(randomXu, 0, 'letterU');
        this.letterU.setCollideWorldBounds(true);
        this.letterU.setBounce(0.5);
        this.letterU.setVisible(false);
        this.letterU.setActive(false);
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
        
        this.physics.add.collider(this.letterA, this.boxOne, this.handlerCollisionA, () => true, this);
        this.physics.add.collider(this.letterAM, this.boxOne, this.handlerCollisionAM, () => true, this);
        this.physics.add.collider(this.letterE, this.boxOne, this.handlerCollisionE, () => true, this);
        this.physics.add.collider(this.letterEM, this.boxOne, this.handlerCollisionEM, () => true, this);
        this.physics.add.collider(this.letterI, this.boxOne, this.handlerCollisionI, () => true, this);
        this.physics.add.collider(this.letterIM, this.boxOne, this.handlerCollisionIM, () => true, this);
        this.physics.add.collider(this.letterO, this.boxOne, this.handlerCollisionO, () => true, this);
        this.physics.add.collider(this.letterOM, this.boxOne, this.handlerCollisionOM, () => true, this);
        this.physics.add.collider(this.letterU, this.boxOne, this.handlerCollisionU, () => true, this);
        this.physics.add.collider(this.letterUM, this.boxOne, this.handlerCollisionUM, () => true, this);

       // Definicion de teclas de control
        this.cursors = this.input.keyboard?.createCursorKeys();

        //Cargar sonido de fondo
        this.addSoundBackground();

        // Tiempo de espera para iniciar grupo de estrellas
        this.time.addEvent({
            delay: 3000,
            callback: this.spawnStar,
            callbackScope: this,
            loop:true
        })
     
    }

    // Renderiza la pantalla ciclicamente detectando los cambios
    override update() {
        if(this.letterA.active) {
            this.letterA.setVelocityY(100);
        }
     
        if(this.letterA.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterA.setPosition(randomX, 0);
            this.letterA.body.velocity.y = 0;
        }


        if(this.letterAM.active) {
            this.letterAM.setVelocityY(150);
        }
     
        if(this.letterAM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterAM.setPosition(randomX, 0);
            this.letterAM.body.velocity.y = 0;
        }

        if(this.letterE.active) {
            this.letterE.setVelocityY(150);
        }

        if(this.letterE.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterE.setPosition(randomX, 0);
            this.letterE.body.velocity.y = 0;
        }

        if(this.letterEM.active) {
            this.letterEM.setVelocityY(100);
        }

        if(this.letterEM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterEM.setPosition(randomX, 0);
            this.letterEM.body.velocity.y = 0;
        }

        if(this.letterI.active) {
            this.letterI.setVelocityY(160);
        }

        if(this.letterI.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterI.setPosition(randomX, 0);
            this.letterI.body.velocity.y = 0;
        }
        if(this.letterIM.active) {
            this.letterIM.setVelocityY(160);
        }

        if(this.letterIM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterIM.setPosition(randomX, 0);
            this.letterIM.body.velocity.y = 0;
        }

        if(this.letterO.active) {
            this.letterO.setVelocityY(100);
        }

        if(this.letterO.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterO.setPosition(randomX, 0);
            this.letterO.body.velocity.y = 0;
        }

        if(this.letterOM.active) {
            this.letterOM.setVelocityY(120);
        }

        if(this.letterOM.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterOM.setPosition(randomX, 0);
            this.letterOM.body.velocity.y = 0;
        }

        if(this.letterU.active) {
            this.letterU.setVelocityY(150);
        }

        if(this.letterU.y > this.scale.height) {
            const randomX = Phaser.Math.Between(0, this.scale.width);
            this.letterU.setPosition(randomX, 0);
            this.letterU.body.velocity.y = 0;
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

    // Precarga assets para alistarlos para la siguiente pantalla (escena)
    preload() {
        this.load.image('background', 'assets/vowels/background.png');
        this.load.image('box', 'assets/vowels/box.png');
        this.load.image('clouds','assets/vowels/cloud.svg');
        this.load.image('star','assets/vowels/star.png')
        this.load.image('star_2','assets/vowels/star_2.png');
        this.load.image('letterA','assets/vowels/a.png');
        this.load.image('letterE','assets/vowels/e.png');
        this.load.image('letterI','assets/vowels/i.png');
        this.load.image('letterO','assets/vowels/o.png');
        this.load.image('letterU','assets/vowels/u.png');

        this.load.image('letterA_M','assets/vowels/A.png');
        this.load.image('letterE_M','assets/vowels/E.png');
        this.load.image('letterI_M','assets/vowels/I.png');
        this.load.image('letterO_M','assets/vowels/O.png');
        this.load.image('letterU_M','assets/vowels/U.png');

        this.load.audio('theme-sound','assets/vowels/sounds/merx-market-song.mp3');
        this.load.audio('coin-sound','assets/vowels/sounds/coin.mp3');
        this.load.audio('coin-up-sound','assets/vowels/sounds/zapsplat_fantasy_magic_chime_ping_wand_fairy_godmother_014_38300.mp3');
    }

    private handlerCollisionA(letter: any) {
        this.addCoinSound('coin-up-sound', 0.2);
        this.addCoinSound('a-sound', 2);
        this.collisionsCountA +=1;
        letter.setVelocityY(100);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
        if(this.collisionsCountA > 8) {
            this.letterE.setVisible(true);
            this.letterE.setActive(true);
        }
        if(this.collisionsCountA > 3) {
            this.letterAM.setVisible(true);
            this.letterAM.setActive(true);
        }

        console.log("this.collisionsCountA", this.collisionsCountA);
        if(this.collisionsCountA >= 10) {
            this.letterU.setVelocityY(0);
            this.letterA.setVisible(false);
            this.letterA.setActive(false);
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

    private handlerCollisionE(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('e-sound',2);
        this.collisionsCountE +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
        if(this.collisionsCountE > 8) {
            this.letterI.setVisible(true);
            this.letterI.setActive(true);
        }
        if(this.collisionsCountE > 3) {
            this.letterEM.setVisible(true);
            this.letterEM.setActive(true);
        }
    }

    private handlerCollisionEM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('e-sound',2);
        this.collisionsCountE +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
                
    }

    private handlerCollisionI(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('i-sound',2);
        this.collisionsCountI +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
        if(this.collisionsCountI > 8) {
            this.letterO.setVisible(true);
            this.letterO.setActive(true);
        }
        if(this.collisionsCountI > 3) {
            this.letterIM.setVisible(true);
            this.letterIM.setActive(true);
        }
    }
    private handlerCollisionIM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('i-sound',2);
        this.collisionsCountI +=1;
        letter.setVelocityY(80);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);  
    }

    private handlerCollisionO(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('o-sound',2);
        this.collisionsCountO +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
        if(this.collisionsCountO > 8) {
            this.letterU.setVisible(true);
            this.letterU.setActive(true);
        }
        if(this.collisionsCountO > 3) {
            this.letterOM.setVisible(true);
            this.letterOM.setActive(true);
        }
    }

    private handlerCollisionOM(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('o-sound',2);
        this.collisionsCountO +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
    }
    private handlerCollisionU(letter: any) {
        this.addCoinSound('coin-up-sound',0.2);
        this.addCoinSound('u-sound',2);
        this.collisionsCountU +=1;
        letter.setVelocityY(150);
        const randomX = Phaser.Math.Between(0, this.scale.width);
        letter.setPosition(randomX, 0);
        if(this.collisionsCountU > 3) {
            this.letterUM.setVisible(true);
            this.letterUM.setActive(true);
        }
        if(this.collisionsCountU > 8) {
            this.scene.start("NextLevel");
            this.sound.stopAll();
        }
        
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
        this.letterA.setVisible(true);
        this.letterA.setActive(true);
    }
        const randomXStar = Phaser.Math.Between(0, this.scale.width);
        star.setPosition(randomXStar, 0);
        star.body.velocity.y = 0; 
        star.setActive(false);
        star.setVisible(false);
    }

    private addSoundBackground() {
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

    private spawnStar() {
        let star = this.stars.getFirstDead(true, Phaser.Math.Between(0, this.scale.width), 0, 'star');

        if (star) {
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