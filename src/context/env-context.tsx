import { createContextId, useContext, component$, Slot, useContextProvider, useStore } from "@builder.io/qwik";

export type EnvContextState = {
  isIframe: boolean;
  isWebView: boolean;
  isStandalone: boolean;
};

export const EnvContext = createContextId<EnvContextState>("env-context");

interface EnvProviderProps {
  initialState: EnvContextState;
}

export const EnvProvider = component$<EnvProviderProps>((props) => {
  const state = useStore<EnvContextState>(props.initialState || {
    isIframe: false,
    isWebView: false,
    isStandalone: true,
  });

  useContextProvider(EnvContext, state);

  return <Slot />;
});

export const useEnv = () => useContext(EnvContext);
