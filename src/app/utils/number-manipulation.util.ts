import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class NumberManipulationUtil {

  public removeValue(value: string): string {
    let numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue > 1) {
      numValue -= 1;
    } else {
      numValue = 99;
    }
    return this.formatValue(numValue);
  }

  public addValue(value: string): string {
    let numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue < 59) {
      numValue += 1;
    } else {
      numValue = 1;
    }
    return this.formatValue(numValue);
  }

  public inputChange(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    const numValue = parseInt(inputElement.value, 10);

    if (numValue >= 1 && numValue <= 99) {
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
