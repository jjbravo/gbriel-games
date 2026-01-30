import Phaser from 'phaser';

export class BubbleGameScene extends Phaser.Scene
{
    private bubbles: Phaser.Physics.Arcade.Group | null = null;
    private score = 0;
    private scoreText: Phaser.GameObjects.Text | null = null;
    private levelText: Phaser.GameObjects.Text | null = null;
    private handPoint: Phaser.GameObjects.Sprite | null = null;
    private popSound: Phaser.Sound.BaseSound | null = null;
    private isPaused = false;
    private pauseText: Phaser.GameObjects.Text | null = null;
    private spawnEvent: Phaser.Time.TimerEvent | null = null;

    private currentLevel: number = 1;
    private vowelsCount: number = 0;
    private showUppercase: boolean = false;

    private colors = [0xff6666, 0x66ff66, 0x6666ff, 0xffff66, 0xff66ff, 0x66ffff, 0xffffff];
    private vowels = ['a', 'e', 'i', 'o', 'u'];
    private vowelSounds: Map<string, Phaser.Sound.BaseSound> = new Map();

    constructor()
    {
        super('BubbleGameScene');
    }

    public preload()
    {
        // Using existing assets
        this.load.image('background', 'assets/vowels/background.png');
        this.load.audio('pop', 'assets/vowels/sounds/coin.mp3');
        this.load.svg('balloon', 'assets/globo.svg');
        this.load.svg('pencil', 'assets/lapiz.svg');
        this.load.image('star', 'assets/vowels/star.png');

        // Load vowels lowercase and uppercase
        this.vowels.forEach(v =>
        {
            this.load.image(v, `assets/vowels/${v}.png`);
            this.load.image(v.toUpperCase(), `assets/vowels/${v.toUpperCase()}.png`);
            this.load.audio(v + '_sound', `assets/vowels/sounds/${v}.mp3`);
        });
    }

    public create()
    {
        const { width, height } = this.scale;

        // Add background image and scale it to cover the entire canvas
        const bg = this.add.image(width / 2, height / 2, 'background');
        bg.setDisplaySize(width, height);

        this.bubbles = this.physics.add.group();
        this.popSound = this.sound.add('pop');

        // Initialize vowel sounds
        this.vowels.forEach(v =>
        {
            this.vowelSounds.set(v, this.sound.add(v + '_sound'));
        });

        this.scoreText = this.add.text(20, 20, 'Burbujas: 0', {
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.levelText = this.add.text(20, 60, 'Nivel: 1 (Globos)', {
            fontSize: '28px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Spawn bubbles more frequently
        this.spawnEvent = this.time.addEvent({
            delay: 1000,
            callback: this.spawnBubble,
            callbackScope: this,
            loop: true
        });

        // Pause listener
        this.input.keyboard?.on('keydown-SPACE', this.togglePause, this);

        // Initialize interaction point as a "Pencil" tool
        this.handPoint = this.add.sprite(0, 0, 'pencil');
        this.handPoint.setScale(0.8);

        // Adjust origin to the tip of the pencil
        // Assuming the pencil tip is at the bottom or top depending on the SVG
        // Let's set it to common orientations, if it needs adjustment, I'll tweak it.
        this.handPoint.setOrigin(0.5, 1);

        this.physics.add.existing(this.handPoint);
        const body = this.handPoint.body as Phaser.Physics.Arcade.Body;
        // Collision circle at the tip (top or bottom depending on origin)
        body.setCircle(15, this.handPoint.width * 0.2, -10);

        // Collision detection
        this.physics.add.overlap(this.handPoint, this.bubbles, (point, bubble) =>
        {
            this.popBubble(bubble as any);
        });

        // Pause Text setup
        this.pauseText = this.add.text(width / 2, height / 2, 'JUEGO PAUSADO\n(Presiona Espacio para Reanudar)', {
            fontSize: '48px',
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: { x: 20, y: 10 },
            align: 'center',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5).setVisible(false).setDepth(100);
    }

    private togglePause()
    {
        this.isPaused = !this.isPaused;

        if (this.isPaused)
        {
            this.physics.pause();
            if (this.spawnEvent) this.spawnEvent.paused = true;
            this.pauseText?.setVisible(true);
        } else
        {
            this.physics.resume();
            if (this.spawnEvent) this.spawnEvent.paused = false;
            this.pauseText?.setVisible(false);
        }
    }

    private spawnBubble()
    {
        if (!this.bubbles || this.isPaused) return;

        const scale = Phaser.Math.FloatBetween(0.5, 1.2);
        const x = Phaser.Math.Between(100, this.scale.width - 100);
        const y = this.scale.height + 100;

        let spriteKey = 'balloon';
        let isVowel = false;
        let vowelKey = '';

        if (this.currentLevel === 2)
        {
            isVowel = true;
            vowelKey = Phaser.Utils.Array.GetRandom(this.vowels);
            spriteKey = vowelKey;

            if (this.showUppercase && Phaser.Math.Between(0, 1) === 1)
            {
                spriteKey = vowelKey.toUpperCase();
            }
        }

        const obj = this.add.sprite(x, y, spriteKey);
        obj.setScale(scale);

        if (!isVowel)
        {
            const color = Phaser.Utils.Array.GetRandom(this.colors);
            obj.setTint(color as number);
        }

        // Store vowel key in data if it's a vowel
        if (isVowel)
        {
            obj.setData('vowel', vowelKey);
        }

        this.bubbles.add(obj);

        const body = obj.body as Phaser.Physics.Arcade.Body;
        // Adjust circular hitbox
        body.setCircle(obj.width * 0.4, obj.width * 0.1, obj.height * 0.05);

        const speed = Phaser.Math.Between(-250, -100) * (1 / scale);
        body.setVelocityY(speed);
        body.setAllowGravity(false);
    }

    private popBubble(bubble: Phaser.GameObjects.Sprite)
    {
        const vowelKey = bubble.getData('vowel');

        if (vowelKey)
        {
            this.vowelSounds.get(vowelKey)?.play();
            this.vowelsCount++;

            if (this.vowelsCount === 20)
            {
                this.showUppercase = true;
                this.levelText?.setText('Nivel: 2 (Vocales Mezcladas)');
            }
        } else
        {
            if (this.popSound) this.popSound.play();
        }

        const x = bubble.x;
        const y = bubble.y;
        const color = bubble.isTinted ? bubble.tintTopLeft : 0xffffff;

        bubble.destroy();
        this.score++;

        if (this.currentLevel === 1)
        {
            if (this.scoreText)
            {
                this.scoreText.setText(`Burbujas: ${this.score}/50`);
            }

            if (this.score >= 50)
            {
                this.currentLevel = 2;
                this.levelText?.setText('Nivel: 2 (Vocales Minúsculas)');
                this.scoreText?.setText(`Puntos: ${this.score}`);

                // Visual feedback for level up
                this.cameras.main.flash(500, 255, 255, 0);
            }
        } else
        {
            if (this.scoreText)
            {
                this.scoreText.setText(`Puntos: ${this.score}`);
            }
        }

        // Add a "pop" effect
        const particles = this.add.particles(x, y, 'star', {
            speed: { min: -150, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            lifespan: 600,
            gravityY: 300,
            quantity: 10,
            tint: color as number
        });

        this.time.delayedCall(600, () => particles.destroy());
    }

    updateHand(hands: any[][])
    {
        if (this.isPaused || !this.handPoint) return;

        if (!hands || hands.length === 0)
        {
            this.handPoint.setVisible(false);
            return;
        }

        this.handPoint.setVisible(true);
        // Use the first hand detected
        const hand = hands[0];
        // Landmark 8 is the index finger tip
        const indexTip = hand[8];

        const x = (1 - indexTip.x) * this.scale.width; // Flip horizontally
        const y = indexTip.y * this.scale.height;

        this.handPoint.setPosition(x, y);
    }

    public override update()
    {
        if (this.isPaused) return;

        // Clean up bubbles that go off screen
        this.bubbles?.children.iterate((bubble: any) =>
        {
            if (bubble && bubble.y < -100)
            {
                bubble.destroy();
            }
            return true;
        });
    }
}
