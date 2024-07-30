import { Routes } from '@angular/router';
import { GameOneComponent } from './game-one/game-one.component';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';

export const routes: Routes = [
    {
        path: 'phaser-game',
        component: PhaserGameComponent
    },
    {
        path: 'game-one',
        component: GameOneComponent
    }
];
