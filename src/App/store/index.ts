import create from "zustand";
import { MyState, SubscriptionType } from "./types";
import { persist } from "zustand/middleware";
import { calculate } from "../services/calculate";
import { infixToPostfix } from "../utils/infixToPostfix";
import { immer } from "./immer";

const useStore = create<MyState>(
  persist(
    immer((set, get) => ({
      value: "",
      error: false,
      pointer: 1,
      processing: false,
      subscription: SubscriptionType.Gold,
      setSubscription: (subscription) => {
        const state = get();

        set((prev) => {
          prev.subscription = subscription;
          prev.processing = false;
        });
        state.calculate();
      },
      updatePointer: (pointer) => {
        set((prev) => {
          prev.pointer = pointer > 0 ? pointer : prev.value.length;
        });
      },
      appendValue: (value) => {
        set((prev) => {
          prev.value += value;
        });
      },
      backspace: () => {
        set((prev) => {
          const pointer = prev.pointer > 0 ? prev.pointer : prev.value.length;
          prev.value =
            prev.value.substring(0, pointer - 1) +
            prev.value.substring(pointer, prev.value.length);
          prev.pointer -= 1;
        });
      },
      updateValue: (value) => {
        set((prev) => {
          prev.value = value;
        });
      },
      infixOperatorClicked: async (operator) => {
        const state = get();
        if (operator !== "=") {
          state.appendValue(operator);
          return;
        }
        state.calculate();
      },
      calculate: async () => {
        const state = get();

        const expressionToCalculate =
          state.calculatorType === "infix"
            ? infixToPostfix(state.value)
            : state.value;

        set((prev) => {
          prev.processing = true;
          prev.error = false;
        });

        try {
          const postfix = await calculate(expressionToCalculate);

          set((prev) => {
            prev.value = postfix;
          });
        } catch (error) {
          set((prev) => {
            prev.error = true;
          });
        }

        set((prev) => {
          prev.processing = false;
        });
      },
      calculatorType: "infix",
      setCalculatorType: (calculatorType: string) => {
        set((prev) => {
          prev.calculatorType = calculatorType;
        });
      },
    })),
    {
      name: "pascaline-storage",
    }
  )
);

export default useStore;
