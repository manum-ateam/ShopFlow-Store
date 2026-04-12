import { createContextId, useContext, component$, Slot, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";

export type EnvContextState = {
  isIframe: boolean;
  isWebView: boolean;
  isStandalone: boolean;
};

export const EnvContext = createContextId<EnvContextState>("env-context");

export const EnvProvider = component$(() => {
  const state = useStore<EnvContextState>({
    isIframe: false,
    isWebView: false,
    isStandalone: true,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const isIframe = window.self !== window.top;
    const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)|Android.*(wv|\.0\.0\.0)/.test(navigator.userAgent);
    
    state.isIframe = isIframe;
    state.isWebView = isWebView;
    state.isStandalone = !isIframe && !isWebView;
    
    // Debug info
    // console.debug('[ShopFlow Env] Context:', { isIframe, isWebView, isStandalone: state.isStandalone });
  });

  useContextProvider(EnvContext, state);

  return <Slot />;
});

export const useEnv = () => useContext(EnvContext);
