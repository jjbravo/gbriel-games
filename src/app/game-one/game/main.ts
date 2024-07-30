import { AUTO, Game } from "phaser";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainGame } from "./scenes/MainGame";


const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1224,
    height: 968,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainGame
    ]
};

const StartGame = (parent: string) => {
    return new Game({...config, parent});
}

export default StartGame;