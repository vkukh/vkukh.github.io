import { Component, Output, EventEmitter } from '@angular/core';

import { States } from '../../models/state.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public isPlayActive: boolean = true;
  public isDisableControl: boolean = false;

  @Output() changeTimerState = new EventEmitter<States>();

  public onTogglePlayPause(): void {
    this.isPlayActive = !this.isPlayActive;
    if (this.isPlayActive) {
      this.changeTimerState.emit(States.Pause);
    } else {
      this.changeTimerState.emit(States.Play);
      this.isDisableControl = true;
    }
  }

  public onReplay(): void {
    this.changeTimerState.emit(States.RePlay);
    this.isDisableControl = false;
  }
}
