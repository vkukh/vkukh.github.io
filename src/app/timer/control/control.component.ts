import { Component, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

import { States } from '../../models/state.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public isPlayActive: boolean = true;
  public isReplayEnable: boolean = false;


  public isDisableControl: boolean = false;

  constructor(private readonly sharedService: SharedService) {}

  @Output() changeTimerState = new EventEmitter<States>();

  public togglePlayPause(): void {
    this.isPlayActive = !this.isPlayActive;
    this.isReplayEnable = !this.isReplayEnable;

    if (this.isPlayActive) {
      console.log(this.isPlayActive);
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
