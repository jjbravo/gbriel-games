import { Routes } from '@angular/router';
import { VowelsComponent } from './vowels/vowels.component';
import { PhaserGameComponent } from './phaser-game/phaser-game.component';

export const routes: Routes = [
    {
        path: 'phaser-game',
        component: PhaserGameComponent
    },
    {
        path: 'game-vowels',
        component: VowelsComponent
    }
];
