import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhaserGame } from "./phaser-game/game/phaser-game.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, PhaserGame],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{
 public collapseSidebar = false;

    ngAfterViewInit(){
      console.warn("After View Angular component");
    }

  
}
