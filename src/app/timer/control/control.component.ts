import { Component, Output, EventEmitter } from '@angular/core';

import { States } from '../../models/state.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public isPlayActive: boolean = true;
  public isReplayEnable: boolean = false;

  @Output() changeTimerState = new EventEmitter<States>();

  public togglePlayPause() {
    this.isPlayActive = !this.isPlayActive;
    this.isReplayEnable = !this.isReplayEnable;

    if (this.isPlayActive) {
      console.log(this.isPlayActive)
    } else {
      console.log(this.isPlayActive)
      this.changeTimerState.emit(States.Play);
    }
  }
  public onReplay() {
    this.changeTimerState.emit(States.RePlay);
  }
}
