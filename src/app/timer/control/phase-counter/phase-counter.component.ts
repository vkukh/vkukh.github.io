import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerBackgroundColor } from 'src/app/models/state.model';
import { SharedService } from 'src/app/services/shared.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-phase-counter',
  templateUrl: './phase-counter.component.html',
  styleUrls: ['./phase-counter.component.scss']
})
export class PhaseCounterComponent implements OnInit, OnDestroy {
  public isCountUp: boolean | undefined = false;
  private _phaseCount: string = '01';
  private nominal: number = 99
  private commonSubscription: Subscription = new Subscription();

  constructor(private readonly keyPressUtils: KeyPressUntils,
    private readonly numberManipulationUtil: NumberManipulationUtil,
    private readonly sharedService: SharedService) {}

  @Input() isDisableControl: boolean = false;

  ngOnInit(): void {
    this.commonSubscription.add(
      this.sharedService.getData()
        .subscribe(data => {
          const { countup } = data;
          if (countup !== undefined) {
            this.isCountUp = countup;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.commonSubscription.unsubscribe();
  }

  public set phaseCount(value: string) {
    if (!value) return;
    this.updateAppControlState(value);
    this._phaseCount = value;
  }

  public get phaseCount(): string {
    return this._phaseCount;
  }

  public onInputChange(event: Event): void {
    this.phaseCount = this.numberManipulationUtil.inputChange(event, this.nominal);
  }

  public onAddValue(value: string): void {
    this.phaseCount = this.numberManipulationUtil.addValue(value, this.nominal);
  }

  public onRemoveValue(value: string): void {
    this.phaseCount = this.numberManipulationUtil.removeValue(value, this.nominal);
  }

  public onKeyPress(event: KeyboardEvent): void {
    return this.keyPressUtils.keyPress(event);
  }

  private updateAppControlState(phases: string): void {
    this.sharedService.setData({ phases });
  }

  public setInputBackgroundColor(): TimerBackgroundColor {
    return this.isCountUp ? TimerBackgroundColor.Green : TimerBackgroundColor.Gray;
  }
}
