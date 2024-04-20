// globals.d.ts
interface SavvyCalFunction {
  (command: string, options?: any): void;
  q: any;
}

interface Window {
  SavvyCal: SavvyCalFunction;
}

declare namespace JSX {
  interface IntrinsicElements {
    "stripe-buy-button": any;
  }
}
