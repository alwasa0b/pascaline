import { timeout } from "workbox-core/_private";
import { PascalineState, SubscriptionType } from "../store/types";
import { isNumeric } from "../utils/isNumeric";

const evaluators: { [key: string]: (left: number, right: number) => number } = {
  "+": (left: number, right: number) => {
    return left + right;
  },
  "-": (left: number, right: number) => {
    return left - right;
  },
  "*": (left: number, right: number) => {
    return left * right;
  },
  "/": (left: number, right: number) => {
    if (right === 0) throw Error("Can't divide by 0");
    return left / right;
  },
};

function valueFromCharArray(p: string[], n: string): string[] {
  if (n.length === 0) return p;

  if (isNumeric(n)) {
    p.push(n);
  } else {
    const evaluateFN = evaluators[n];
    const right = Number(p.pop());
    const left = Number(p.pop());
    const stringValue = evaluateFN(left, right).toString();
    return [stringValue, ...p];
  }

  return p;
}

export async function calculate(value: string) {
  const profile: { [key: string]: PascalineState } = JSON.parse(
    window.localStorage.getItem("pascaline-storage") || ""
  );

  const charArray = value.split(" ");

  const noCalculationNeeded = charArray.length === 1 && isNumeric(charArray[0]);

  if (noCalculationNeeded) return charArray[0];

  const calculatedValue: string[] = charArray.reduce(
    valueFromCharArray,
    [] as string[]
  );

  const instanceProcessingPower =
    (profile.state.subscription === SubscriptionType.Gold ||
    profile.state.subscription === SubscriptionType.Premium
      ? Number(calculatedValue[0]) * profile.state.subscription
      : 0) * Math.random();

  await timeout(
    instanceProcessingPower > 10000 ? 10000 : instanceProcessingPower
  );

  const errorsFound =
    calculatedValue.length > 1 || !isNumeric(calculatedValue[0]);

  if (errorsFound) throw new Error("not a valid postfix");

  return calculatedValue[0];
}
