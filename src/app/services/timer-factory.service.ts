import { Injectable } from "@angular/core";
import { ICountDownTimerConfig } from "../models/timer-config.model";
import { CountDownTimerService } from "./count-down-timer.service";

@Injectable({
  providedIn: 'root'
})
export class TimerFactory {
  
  public createCountDownTimer(config: ICountDownTimerConfig): CountDownTimerService {
    return new CountDownTimerService(config);
  }
}