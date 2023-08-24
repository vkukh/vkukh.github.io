import { Component, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { States } from '../../models/state.model';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public isPlayActive: boolean = true;
  public isReplayEnable: boolean = false;

  public countUpColor: ThemePalette = 'primary';
  public isDisableControl: boolean = false;
  public roundCount: string = '01';
  public warmUpCount: string = '01';
  public phaseCount: string = '01';

  @Output() changeTimerState = new EventEmitter<States>();

  public togglePlayPause(): void {
    this.isPlayActive = !this.isPlayActive;
    this.isReplayEnable = !this.isReplayEnable;

    if (this.isPlayActive) {
      console.log(this.isPlayActive);
    } else {
      this.changeTimerState.emit(States.Play);
      this.isDisableControl = true;
    }
  }
  public onReplay(): void {
    this.changeTimerState.emit(States.RePlay);
    this.isDisableControl = false;
  }
  public onCountUp(event: MatSlideToggleChange): void {
    const { checked } = event;
    if (checked) {
      console.log('countUp');
    } else {
      console.log('countDown');
    }
  }

  public onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const numValue = parseInt(inputElement.value, 10);
  
    if (numValue >= 1 && numValue <= 99) {
      inputElement.value = this.formatValue(numValue);
    } else {
      inputElement.value = '01';
    }
  }
  public onKeyPress(event: KeyboardEvent): void {
    const allowedKeys = /^[0-9]$/;
    if (!event.key.match(allowedKeys)) {
      event.preventDefault();
    }
  }
  private formatValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`; 
  }

  public addValue(input: HTMLInputElement) {
    let numValue = parseInt(input.value, 10);
    if (!isNaN(numValue) && numValue < 59) {
      numValue += 1;
    } else {
      numValue = 1;
    }
    input.value = this.formatValue(numValue);
  }

  removeValue(input: HTMLInputElement) {
    let numValue = parseInt(input.value, 10);
    if (!isNaN(numValue) && numValue > 1) {
      numValue -= 1;
    } else {
      numValue = 99;
    }
    input.value = this.formatValue(numValue);
  }
}
