import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerBackgroundColor } from 'src/app/models/state.model';
import { SharedService } from 'src/app/services/shared.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss']
})
export class RoundCounterComponent implements OnInit, OnDestroy {
  public isCountUp: boolean | undefined = false;
  private _roundCount: string = '01';
  private nominal: number = 99;
  private commonSubscription: Subscription = new Subscription();

  constructor(private keyPressUtils: KeyPressUntils, 
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

  public set roundCount(value: string) {
    // emit round count
    this._roundCount = value;
  }

  public get roundCount(): string {
    return this._roundCount;
  }

  public onInputChange(event: Event): void {
    this.roundCount = this.numberManipulationUtil.inputChange(event, this.nominal);
  }

  public onAddValue(value: string): void {
    this.roundCount = this.numberManipulationUtil.addValue(value, this.nominal);
  }

  public onRemoveValue(value: string): void {
    this.roundCount = this.numberManipulationUtil.removeValue(value, this.nominal);
  }

  public onKeyPress(event: Event): void {
    return this.keyPressUtils.keyPress(event);
  }

  public setInputBackgroundColor(): TimerBackgroundColor {
    return this.isCountUp ? TimerBackgroundColor.Green : TimerBackgroundColor.Gray;
  }
}
