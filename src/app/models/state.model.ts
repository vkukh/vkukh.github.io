export enum States {
  Play = 'play',
  Pause = 'pause',
  RePlay = 'replay'
}

export enum StateColors {
  Red = 'rgb(255,0,0)',
  Green = 'rgb(6, 221, 6)'
}

export enum TimerBackgroundColor {
  Gray = '#F0F8FF',
  Green = '#20B2AA'
}

export type AppControlState = {
  rounds?: string;
  warmup?: string;
  countup?: boolean;
  phases?: string;
}