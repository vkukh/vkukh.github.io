import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class NumberManipulationUtil {

  public removeValue(value: string, nominal: number): string {
    let numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue > 1) {
      numValue -= 1;
    } else {
      numValue = nominal;
    }
    return this.formatValue(numValue);
  }

  public addValue(value: string, nominal: number): string {
    let numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue < nominal) {
      numValue += 1;
    } else {
      numValue = 1;
    }
    return this.formatValue(numValue);
  }

  public inputChange(event: Event, nominal: number): string {
    const inputElement = event.target as HTMLInputElement;
    const numValue = parseInt(inputElement.value, 10);

    if (numValue >= 1 && numValue <= nominal) {
      inputElement.value = this.formatValue(numValue);
    } else {
      inputElement.value = '01';
    }
    return inputElement.value;
  }

  private formatValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`; 
  }
}
