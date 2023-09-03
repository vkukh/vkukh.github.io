import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { IPhase, PhaseState } from 'src/app/models/phase.model';
import { TimerBackgroundColor } from 'src/app/models/state.model';

import { SharedService } from 'src/app/services/shared.service';
import { TimerFactory } from 'src/app/services/timer-factory.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit, OnDestroy {
  
  public isCountUp: boolean | undefined = false;
  private commonSubscription: Subscription = new Subscription();
  private _phaseItems: IPhase[] = [{
    opacity: '100%',
    state: PhaseState.Work,
    leftValue: '00',
    rightValue: '20',
    index: 0,
    badge: 1
  }];
  private readonly REST_BADGE: string = 'R';
  private nominal: number = 59;
  
  constructor(private readonly sharedService: SharedService,
    private keyPressUtils: KeyPressUntils,
    private readonly numberManipulationUtil: NumberManipulationUtil,
    private timerFactory: TimerFactory) {}

  @Input() isNotPlay: boolean = true;

  public ngOnInit(): void {
      this.commonSubscription.add(
        this.sharedService.getData()
          .subscribe(data => {
            const { phases, countup } = data;
            if (phases && !(phases === '0' || phases === '00') && parseInt(phases, 10)) {
              this.setPhases(phases);
            }
            if (countup !== undefined) {
              this.isCountUp = countup;
            }
          })
      );
      const countDownTimer = this.timerFactory.createCountDownTimer({ minutes: 0, seconds: 10 });
      countDownTimer.start();
  }

  private setPhases(phasesCount: string): void {
    const phaseItemsLength = this.phaseItems.length;
    const diffCount = parseInt(phasesCount, 10) - phaseItemsLength;
    if (diffCount >= 0) {
      this.phaseItems = [...this.phaseItems, ...this.makePhases(diffCount)];
    } else {
      this.phaseItems.splice(diffCount);
    }
    this.updateBagesAndIndexes();
  }

  private makePhases(count: number): IPhase[] {
    return new Array(count).fill(null)
    .map((_, index) => ({
      opacity: '100%',
      state: PhaseState.Work,
      leftValue: '00',
      rightValue: '20',
      index,
      badge: index + 1
    }));
  }

  private set phaseItems(phases: IPhase[]) {
    this._phaseItems = phases;
  }

  public get phaseItems(): IPhase[] {
    return this._phaseItems;
  }

  public ngOnDestroy(): void {
		this.commonSubscription.unsubscribe();
  }

  public onKeyPress(event: Event): void {
    return this.keyPressUtils.keyPress(event);
  }

  public onInputChangeLeft(event: Event, index: number): void {
    this.phaseItems[index].leftValue = this.numberManipulationUtil.inputChange(event, this.nominal);
  }

  public onInputChangeRight(event: Event, index: number): void {
    this.phaseItems[index].rightValue = this.numberManipulationUtil.inputChange(event, this.nominal);
  }

  public onStateChange(event: MatRadioChange, index: number): void {
    const { value } = event;
    if (value === PhaseState.Remove) this.removePhase(index);
    this.updateBagesAndIndexes();
  }

  public removePhase(index: number): void {
    this.phaseItems.splice(index, 1);
  }

  private updateBagesAndIndexes(): void {
    let shiftCount = 0;
    this.phaseItems = this.phaseItems.map((item, index) => {
      if (item.state === PhaseState.Rest) {
        shiftCount++;
        return { ...item, badge: this.REST_BADGE, index };
      }
      return { ...item, badge: index + 1 - shiftCount, index };
    });
  }

  public setInputBackgroundColor(): TimerBackgroundColor {
    return this.isCountUp ? TimerBackgroundColor.Green : TimerBackgroundColor.Gray;
  }
}
