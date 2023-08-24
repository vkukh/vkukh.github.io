import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedData = new BehaviorSubject<string>('');

  setData(newValue: string): void {
    this.sharedData.next(newValue);
  }

  getData() {
    return this.sharedData.asObservable();
  }
}
