export enum PhaseState {
  Work = 'work',
  Rest = 'rest',
  Remove = 'remove'
}

export interface IPhase {
  opacity: string;
  state: PhaseState;
  leftValue: string;
  rightValue: string;
  badge: string | number;
  index: number;
}