import { AUTO, Game } from "phaser";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainGame } from "./scenes/MainGame";
import { NextLevel } from "./scenes/NextLevel";


const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth - 210,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainGame,
        NextLevel
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 }, // Gravedad global, ajustable si se requiere
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // Escala automáticamente cuando cambia el tamaño de la ventana
        autoCenter: Phaser.Scale.CENTER_BOTH // Centra automáticamente el juego
    }
};

const StartGame = (parent: string) => {
    const game = new Game({...config, parent});
    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });
    return game;
}


export default StartGame;