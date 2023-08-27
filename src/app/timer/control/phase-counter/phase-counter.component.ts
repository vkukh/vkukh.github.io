import { Component, Input } from '@angular/core';
import { AppControlState } from 'src/app/models/state.model';
import { SharedService } from 'src/app/services/shared.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';
import { NumberManipulationUtil } from 'src/app/utils/number-manipulation.util';

@Component({
  selector: 'app-phase-counter',
  templateUrl: './phase-counter.component.html',
  styleUrls: ['./phase-counter.component.scss']
})
export class PhaseCounterComponent {
  private _phaseCount: string = '01';
  private nominal: number = 99

  constructor(private readonly keyPressUtils: KeyPressUntils, 
    private readonly numberManipulationUtil: NumberManipulationUtil,
    private readonly sharedService: SharedService) {}

  @Input() isDisableControl: boolean = false;

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
}
