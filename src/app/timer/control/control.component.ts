import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public isPlay: boolean = true;
  public isReplayEnable: boolean = false;

  public togglePlayPause() {
    this.isPlay = !this.isPlay;
    this.isReplayEnable = !this.isReplayEnable;

    if (this.isPlay) {
      console.log('Play:');
    } else {
      console.log('Pause:');
    }
  }
}
