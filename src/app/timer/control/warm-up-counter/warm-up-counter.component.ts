import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerBackgroundColor } from 'src/app/models/state.model';
import { SharedService } from 'src/app/services/shared.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-warm-up-counter',
  templateUrl: './warm-up-counter.component.html',
  styleUrls: ['./warm-up-counter.component.scss']
})
export class WarmUpCounterComponent implements OnInit, OnDestroy {
  public isCountUp: boolean | undefined = false;
  private _warmUpCount: string = '01';
  private nominal: number = 60;
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

  public set warmUpCount(value: string) {
    // emit round count
    this._warmUpCount = value;
  }

  public get warmUpCount(): string {
    return this._warmUpCount;
  }

  public onInputChange(event: Event): void {
    this.warmUpCount = this.numberManipulationUtil.inputChange(event, this.nominal);
  }

  public onAddValue(value: string): void {
    this.warmUpCount = this.numberManipulationUtil.addValue(value, this.nominal);
  }

  public onRemoveValue(value: string): void {
    this.warmUpCount = this.numberManipulationUtil.removeValue(value, this.nominal);
  }

  public onKeyPress(event: Event): void {
    return this.keyPressUtils.keyPress(event);
  }

  public setInputBackgroundColor(): TimerBackgroundColor {
    return this.isCountUp ? TimerBackgroundColor.Green : TimerBackgroundColor.Gray;
  }
}
