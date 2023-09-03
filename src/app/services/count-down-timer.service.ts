import { Inject, Injectable, Optional } from '@angular/core';

import { ICountDownTimerConfig } from '../models/timer-config.model';

@Injectable({
  providedIn: 'root'
})
export class CountDownTimerService {

  private initialMinutes: number | undefined;
  private initialSeconds: number | undefined;
  private remainingMinutes: number | undefined;
  private remainingSeconds: number | undefined;
  private interval: number | undefined;
  private _onEndFunction: (() => void) | null;

  constructor(@Optional() @Inject('ICountDownTimerConfig') private config?: ICountDownTimerConfig) {
    if (config) {
      this.initialMinutes = this.config?.minutes;
      this.initialSeconds = this.config?.seconds;
      this.remainingMinutes = this.config?.minutes;
      this.remainingSeconds = this.config?.seconds;
    }

    this.interval = undefined;
    this._onEndFunction = null;
  }

  pause() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  stop() {
    this.pause();
    this.reset();
  }

  reset() {
    this.remainingMinutes = this.initialMinutes;
    this.remainingSeconds = this.initialSeconds;
  }

  resume() {
    this.start();
  }

  set onEnd(callback) {
    if (typeof callback === "function") {
      this._onEndFunction = callback;
    } else {
      throw new Error('"onEnd" must be a function');
    }
  }
  
  get onEnd() {
    if (this._onEndFunction) {
      return this._onEndFunction();
    }
  }

  getTime() {
    let minutes = this.remainingMinutes?.toString();
    let seconds = this.remainingSeconds?.toString();
    
    if (minutes && minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds && seconds.length < 2) {
      seconds = '0' + seconds;
    }
    
    return `${minutes}:${seconds}`;
  }

  onTick() {
    console.log(this.getTime());
  }

  start() {
    if (!this.interval) {
      this.interval = window.setInterval(() => {
        if (this.remainingMinutes && this.remainingSeconds === 0 && this.remainingMinutes > 0) {
          this.remainingMinutes -= 1;
          this.remainingSeconds = 59;
        } else if(this.remainingSeconds) {
          this.remainingSeconds -= 1;
        }

        this.onTick();

        if (this.remainingMinutes === 0 && this.remainingSeconds === 0) {
          this.stop();
          if (typeof this.onEnd === "function") {
            this.onEnd;
          }
        }
      }, 1000);
    }
  }
}

// function startTimersSequentially(timers) {
//   if (timers.length === 0) return;

//   const timer = timers.shift();
//   timer.onEnd = () => {
//     console.log(`Timer with duration ${timer.initialMinutes}:${timer.initialSeconds} has ended. Starting next timer...`);
//     startTimersSequentially(timers);
//   };
//   timer.start();
// }

// // Создайте динамически таймеры с разной продолжительностью
// const dynamicTimers = [
//   new Timer(0, 5),
//   new Timer(0, 10),
//   new Timer(0, 15),
// ];

// // Запустите таймеры последовательно
// startTimersSequentially(dynamicTimers);