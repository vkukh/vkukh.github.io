import { Component, Input } from '@angular/core';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-phase-counter',
  templateUrl: './phase-counter.component.html',
  styleUrls: ['./phase-counter.component.scss']
})
export class PhaseCounterComponent {
  private _phaseCount: string = '01';

  constructor(private readonly keyPressUtils: KeyPressUntils, 
    private readonly numberManipulationUtil: NumberManipulationUtil) {}

  @Input() isDisableControl: boolean = false;

  public set phaseCount(value: string) {
    // emit phase count
    console.log(value);
    this._phaseCount = value;
  }

  public get phaseCount(): string {
    return this._phaseCount;
  }

  public onInputChange(event: Event): void {
    this.phaseCount = this.numberManipulationUtil.inputChange(event);
  }

  public onAddValue(value: string): void {
    this.phaseCount = this.numberManipulationUtil.addValue(value);
  }

  public onRemoveValue(value: string): void {
    this.phaseCount = this.numberManipulationUtil.removeValue(value);
  }

  public onKeyPress(event: KeyboardEvent): void {
    return this.keyPressUtils.keyPress(event);
  }
}
