import { GetState, SetState, StoreApi } from "zustand";
import { MyState } from "./types";
import { produce } from "immer";

export function immer(
  config: (
    set: (fn: (partial: MyState) => void) => void,
    get: GetState<MyState>,
    api: StoreApi<MyState>
  ) => MyState) {
  return (
    set: SetState<MyState>,
    get: GetState<MyState>,
    api: StoreApi<MyState>
  ) => config((fn: any) => set(produce(fn)), get, api);
}
