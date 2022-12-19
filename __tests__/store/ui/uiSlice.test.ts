import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";
import { describe, test, expect } from "vitest";

describe("Tests of uiSlice", () => {
  test("should return initial state", () => {
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
    });
  });

  test('should return the slice name as "ui"', () => {
    expect(uiSlice.name).toEqual("ui");
  });

  test("should change isDateModalOpen to true correctly", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal);
    expect(state.isDateModalOpen).toBeTruthy();
  });

  test("should change isDateModalOpen to false correctly", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onCloseDateModal);
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
