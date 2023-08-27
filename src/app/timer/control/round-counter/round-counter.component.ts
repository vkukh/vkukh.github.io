import { Component, Input } from '@angular/core';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.scss']
})
export class RoundCounterComponent {
  private _roundCount: string = '01';
  private nominal: number = 99;

  constructor(private readonly keyPressUtils: KeyPressUntils, 
    private readonly numberManipulationUtil: NumberManipulationUtil) {}

  @Input() isDisableControl: boolean = false;

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

  public onKeyPress(event: KeyboardEvent): void {
    return this.keyPressUtils.keyPress(event);
  }
}
