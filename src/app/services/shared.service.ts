import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppControlState } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedData = new BehaviorSubject<AppControlState>({});

  public setData(newValue: AppControlState): void {
    this.sharedData.next(newValue);
  }

  public getData() {
    return this.sharedData.asObservable();
  }
}
