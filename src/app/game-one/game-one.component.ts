import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GameOne } from "./game/phaser-game-component";
import { CommonModule } from '@angular/common';
import { EventBus } from './game/EventBus';

@Component({
  selector: 'app-game-one',
  standalone: true,
  imports: [CommonModule, GameOne],
  templateUrl: './game-one.component.html',
  styleUrl: './game-one.component.css'
})
export class GameOneComponent implements AfterViewInit{
  public canMoveSprite = false;

  @ViewChild(GameOne) phaserRef!: GameOne
  

  ngAfterViewInit(): void {
      EventBus.on('current-scene-ready',(scene: Phaser.Scene) => {
        this.canMoveSprite = scene.scene.key !== 'MainMenu'
      })
  }
}
