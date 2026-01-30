import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Phaser from 'phaser';
import { BubbleGameScene } from './bubble-game-scene';
import { MotionCaptureService } from '../services/motion-capture.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bubble-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bubble-game.component.html',
  styleUrls: ['./bubble-game.component.css']
})
export class BubbleGameComponent implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;

  private game: Phaser.Game | null = null;
  private scene: BubbleGameScene | null = null;
  private poseSubscription: Subscription | null = null;

  constructor(private motionService: MotionCaptureService) { }

  ngOnInit()
  {
    this.scene = new BubbleGameScene();
  }

  ngAfterViewInit()
  {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: this.gameContainer.nativeElement,
      width: '100%',
      height: '100%',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: { gravity: { x: 0, y: 0 } }
      },
      scene: this.scene!
    };

    this.game = new Phaser.Game(config);
    this.motionService.startCamera(this.videoElement.nativeElement);

    this.poseSubscription = this.motionService.handLandmarks$.subscribe(hands =>
    {
      if (this.scene && hands)
      {
        this.scene.updateHand(hands);
      }
    });
  }

  ngOnDestroy()
  {
    if (this.game)
    {
      this.game.destroy(true);
    }
    if (this.poseSubscription)
    {
      this.poseSubscription.unsubscribe();
    }
  }
}
