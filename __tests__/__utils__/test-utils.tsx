import React, { PropsWithChildren } from "react";
import { renderHook, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import type { AppStore } from "../../src/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  store?: AppStore;
}

export const renderStoreHookWithProviders = (
  hook: () => any,
  mockStore: ToolkitStore,
  {
    // create a store instance
    store = mockStore,
  }: ExtendedRenderOptions = {}
): { store: AppStore; result: { current: {} } } => {
  const Wrapper = ({
    children,
  }: PropsWithChildren<Record<string, unknown>>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  );

  const { result } = renderHook(hook, { wrapper: Wrapper });

  // Return an object with the store and result of render the hook
  return {
    store,
    result,
  };
};
