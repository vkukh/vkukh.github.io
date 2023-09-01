import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountDownTimerService {

  constructor() { }
}


// class Timer {
//   constructor(minutes = 0, seconds = 0) {
//     this.initialMinutes = minutes;
//     this.initialSeconds = seconds;
//     this.remainingMinutes = minutes;
//     this.remainingSeconds = seconds;
//     this.interval = null;
//     this._onEndFunction = null;
//   }

//   pause() {
//     clearInterval(this.interval);
//     this.interval = null;
//   }

//   stop() {
//     this.pause();
//     this.reset();
//   }

//   reset() {
//     this.remainingMinutes = this.initialMinutes;
//     this.remainingSeconds = this.initialSeconds;
//   }

//   resume() {
//     this.start();
//   }

//   set onEnd(callback) {
//     if (typeof callback === "function") {
//       this._onEndFunction = callback;
//     } else {
//       throw new Error('"onEnd" must be a function');
//     }
//   }
  
//   get onEnd() {
//     if (this._onEndFunction) {
//       this._onEndFunction();
//     }
//   }

//   getTime() {
//     let minutes = this.remainingMinutes.toString();
//     let seconds = this.remainingSeconds.toString();
    
//     if (minutes.length < 2) {
//       minutes = '0' + minutes;
//     }
//     if (seconds.length < 2) {
//       seconds = '0' + seconds;
//     }
    
//     return `${minutes}:${seconds}`;
//   }

//   onTick() {
//     console.log(this.getTime());
//   }

//   start() {
//     if (!this.interval) {
//       this.interval = setInterval(() => {
//         if (this.remainingSeconds === 0 && this.remainingMinutes > 0) {
//           this.remainingMinutes -= 1;
//           this.remainingSeconds = 59;
//         } else {
//           this.remainingSeconds -= 1;
//         }

//         // Вызываем метод onTick для вывода времени в реальном времени
//         this.onTick();

//         if (this.remainingMinutes === 0 && this.remainingSeconds === 0) {
//           this.stop();
//           if (typeof this.onEnd === "function") {
//             this.onEnd();
//           }
//         }
//       }, 1000);
//     }
//   }
// }

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