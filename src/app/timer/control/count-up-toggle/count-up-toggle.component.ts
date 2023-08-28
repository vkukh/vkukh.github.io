import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-count-up-toggle',
  templateUrl: './count-up-toggle.component.html',
  styleUrls: ['./count-up-toggle.component.scss']
})
export class CountUpToggleComponent {

  public countUpColor: ThemePalette = 'primary';

  constructor(private readonly sharedService: SharedService) {}
  
  @Input() isDisableControl: boolean = false;

  public onCountUp(event: MatSlideToggleChange): void {
    const { checked } = event;
    console.log(checked);
    this.updateCountUpState(checked);
  }

  private updateCountUpState(state: boolean): void {
    this.sharedService.setData({ countup: state});
  }
}
