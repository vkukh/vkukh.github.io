import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { States } from 'src/app/models/state.model';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit, OnDestroy {
  public phases: number[] = [1];
  public labelPosition: 'active' | 'rest' | 'remove' = 'active'
  private commonSubscription: Subscription = new Subscription();
  
  constructor(private sharedService: SharedService) {}

  @Input() isNotPlay: boolean = true;

  public ngOnInit(): void {
      this.commonSubscription.add(
        this.sharedService.getData()
          .subscribe(data => {
            const dataToNumber = !data ? 0 : parseInt(data, 10);
            if (!dataToNumber) return;
            this.phases = new Array(dataToNumber).fill(1);
          })
      );
  }

  public ngOnDestroy(): void {
		this.commonSubscription.unsubscribe();
  }
}
