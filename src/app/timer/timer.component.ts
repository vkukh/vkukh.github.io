import { Component } from '@angular/core';

import { States, StateColors } from '../models/state.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public isPanelOpen = false;
  public iconColor: string = StateColors.Green;

  public onPanelOpened(open: boolean): void {
    this.isPanelOpen = open;
  }

  public onStateReceived(state: States): void {
    const setState: {
      [key in States]?: () => StateColors;
    } = {
      [States.Play]: () => this.iconColor = StateColors.Red,
      [States.RePlay]: () => this.iconColor = StateColors.Green
    }
    setState[state]?.();
  }
}
