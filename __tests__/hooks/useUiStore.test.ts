import { describe, test, expect } from "vitest";
import { act } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice, UiState } from "../../src/store";
import { renderStoreHookWithProviders } from "../__utils__/test-utils";

const getMockStore = (initialState: UiState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Tests of useUiStore hook", () => {
  test("should return default values", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderStoreHookWithProviders(
      () => useUiStore(),
      mockStore
    );
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
    });
  });

  test("openDateModal should set true in isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderStoreHookWithProviders(
      () => useUiStore(),
      mockStore
    );
    const { openDateModal } = result.current;

    // mandatory method for make changes in state
    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("should set to false in isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderStoreHookWithProviders(
      () => useUiStore(),
      mockStore
    );
    const { closeDateModal } = result.current;

    // mandatory method for make changes in state
    act(() => {
      closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
