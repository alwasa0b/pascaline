export enum SubscriptionType {
  Gold = 1,
  Premium = 0.3,
  Platinum = 0,
}

export interface PascalineState {
  value: string;
  processing: boolean;
  pointer: number;
  error: boolean;
  subscription: SubscriptionType;
  calculate: () => void;
  updateValue: (value: string) => void;
  appendValue: (value: string) => void;
  updatePointer: (pointer: number) => void;
  backspace: () => void;
  setSubscription: (subscription: number) => void;
  infixOperatorClicked: (operator: string) => void;
  calculatorType: string;
  setCalculatorType: (calculatorType: string) => void;
}

export type MyState = PascalineState;
