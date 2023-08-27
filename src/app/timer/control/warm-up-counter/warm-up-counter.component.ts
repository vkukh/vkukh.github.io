import { Component, Input } from '@angular/core';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-warm-up-counter',
  templateUrl: './warm-up-counter.component.html',
  styleUrls: ['./warm-up-counter.component.scss']
})
export class WarmUpCounterComponent {
  private _warmUpCount: string = '01';
  private nominal: number = 60;

  constructor(private readonly keyPressUtils: KeyPressUntils, 
    private readonly numberManipulationUtil: NumberManipulationUtil) {}

  @Input() isDisableControl: boolean = false;

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

  public onKeyPress(event: KeyboardEvent): void {
    return this.keyPressUtils.keyPress(event);
  }
}
