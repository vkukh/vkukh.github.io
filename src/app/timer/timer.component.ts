import { Component, OnDestroy, OnInit } from '@angular/core';

import { States, StateColors, AppControlState, TimerBackgroundColor } from '../models/state.model';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  public iconColor: string = StateColors.Green;
  public isNotPlay: boolean = true;
  public isCountUp: boolean | undefined = false;
  private commonSubscription: Subscription = new Subscription();

  constructor(private readonly sharedService: SharedService) {}

  ngOnDestroy(): void {
    this.commonSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.commonSubscription.add(
      this.sharedService.getData()
        .subscribe((data: AppControlState) => {
          const { countup } = data;
          if (countup !== undefined) {
            this.isCountUp = countup;
          }
        })
    );
  }

  public onStateReceived(state: States): void {
    const setState: {
      [key in States]?: () => StateColors;
    } = {
      [States.Play]: () => this.iconColor = StateColors.Red,
      [States.RePlay]: () => this.iconColor = StateColors.Green
    }
    setState[state]?.();
    this.isNotPlay = state !== States.Play;
  }

  public setTimerBackgroundColor(): TimerBackgroundColor {
    return this.isCountUp ? TimerBackgroundColor.Green : TimerBackgroundColor.Gray;
  }
}
