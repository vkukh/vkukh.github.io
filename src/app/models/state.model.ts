export enum States {
  Play = 'play',
  Stop = 'stop',
  RePlay = 'replay'
}

export enum StateColors {
  Red = 'rgb(255,0,0)',
  Green = 'rgb(6, 221, 6)'
}

export type AppControlState = {
  rounds?: string;
  warmup?: string;
  countup?: boolean;
  phases?: string;
}