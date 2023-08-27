import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit, OnDestroy {
  public phasesToView: number[] = [1];
  public labelPositions: ('active' | 'rest' | 'remove')[] = [];
  private commonSubscription: Subscription = new Subscription();
  
  constructor(private readonly sharedService: SharedService) {}

  @Input() isNotPlay: boolean = true;

  public ngOnInit(): void {
      this.commonSubscription.add(
        this.sharedService.getData()
          .subscribe(data => {
            const { phases } = data;
            if (phases && !(phases === '0' || phases === '00')) {
              this.phasesToView = new Array(parseInt(phases, 10));
              this.labelPositions = new Array(this.phasesToView.length).fill('active');
            }
          })
      );
  }

  public ngOnDestroy(): void {
		this.commonSubscription.unsubscribe();
  }
}
