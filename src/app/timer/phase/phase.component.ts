import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { IPhase, PhaseState } from 'src/app/models/phase.model';

import { SharedService } from 'src/app/services/shared.service';
import { KeyPressUntils } from 'src/app/utils/key-press.util';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit, OnDestroy {
  
  private commonSubscription: Subscription = new Subscription();
  private _phaseItems: IPhase[] = [{
    opacity: '100%',
    state: PhaseState.Work,
    leftValue: '00',
    rightValue: '20',
    index: 0,
    badge: 1
  }];
  private readonly REST_BADGE: string = 'R';
  
  constructor(private readonly sharedService: SharedService,
    private readonly keyPressUtils: KeyPressUntils) {}

  @Input() isNotPlay: boolean = true;

  public ngOnInit(): void {
      this.commonSubscription.add(
        this.sharedService.getData()
          .subscribe(data => {
            const { phases } = data;
            if (phases && !(phases === '0' || phases === '00')) {
              this.setPhases(phases);
            }
          })
      );
  }

  private setPhases(phasesCount: string): void {
    this.phaseItems = new Array(parseInt(phasesCount, 10)).fill(null)
      .map((_, index) => ({
        opacity: '100%',
        state: PhaseState.Work,
        leftValue: '00',
        rightValue: '20',
        index,
        badge: index + 1
      }));
  }

  private set phaseItems(phases: IPhase[]) {
    console.log(phases);
    this._phaseItems = phases;
  }

  public get phaseItems(): IPhase[] {
    return this._phaseItems;
  }

  public ngOnDestroy(): void {
		this.commonSubscription.unsubscribe();
  }

  public onKeyPress(event: KeyboardEvent): void {
    return this.keyPressUtils.keyPress(event);
  }

  public onStateChange(event: MatRadioChange):void {
    const { value } = event;
    if (value) {
      this.updateBagesAndIndexes();
    }
  }

  public onRemovePhase(index: number): void {
    if (!index) return;
    this.phaseItems.splice(index, 1);
    this.updateBagesAndIndexes();
  }

  private updateBagesAndIndexes(): void {
    let shiftCount = 0;
    this.phaseItems = this.phaseItems.map((item, index) => {
      if (item.state === PhaseState.Rest) {
        shiftCount++;
        return { ...item, badge: this.REST_BADGE, index };
      }
      return { ...item, badge: index + 1 - shiftCount, index };
    });
  }
}
