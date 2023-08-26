import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-count-up-toggle',
  templateUrl: './count-up-toggle.component.html',
  styleUrls: ['./count-up-toggle.component.scss']
})
export class CountUpToggleComponent {

  public countUpColor: ThemePalette = 'primary';
  
  @Input() isDisableControl: boolean = false;

  public onCountUp(event: MatSlideToggleChange): void {
    const { checked } = event;
    if (checked) {
      console.log('countUp');
    } else {
      console.log('countDown');
    }
  }
}
