import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Vowels } from "./game/phaser-game-component";
import { CommonModule } from '@angular/common';
import { EventBus } from './game/EventBus';

@Component({
  selector: 'app-vowels',
  standalone: true,
  imports: [CommonModule, Vowels],
  templateUrl: './vowels.component.html',
  styleUrl: './vowels.component.css'
})
export class VowelsComponent implements AfterViewInit{
  public canMoveSprite = false;

  @ViewChild(Vowels) phaserRef!: Vowels
  

  ngAfterViewInit(): void {
      EventBus.on('current-scene-ready',(scene: Phaser.Scene) => {
        this.canMoveSprite = scene.scene.key !== 'MainMenu'
      })
  }
}
