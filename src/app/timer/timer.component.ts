import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public isPanelOpen = false;

  public onPanelOpened(open: boolean) {
    this.isPanelOpen = open;
  }
}
