import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AppControlState } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedData = new ReplaySubject<AppControlState>(1);

  public setData(newValue: AppControlState): void {
    this.sharedData.next(newValue);
  }

  public getData() {
    return this.sharedData.asObservable();
  }
}
