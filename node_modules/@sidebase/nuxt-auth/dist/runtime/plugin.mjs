import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import useSessionState from "./composables/useSessionState.mjs";
import useSession from "./composables/useSession.mjs";
import authMiddleware from "./middleware/auth.mjs";
export default defineNuxtPlugin(async (nuxtApp) => {
  const { enableSessionRefreshOnWindowFocus, enableSessionRefreshPeriodically, enableGlobalAppMiddleware } = useRuntimeConfig().public.auth;
  const { data, lastRefreshedAt } = useSessionState();
  const { getSession } = useSession();
  if (typeof data.value === "undefined") {
    await getSession();
  }
  const visibilityHandler = () => {
    if (enableSessionRefreshOnWindowFocus && document.visibilityState === "visible") {
      getSession();
    }
  };
  nuxtApp.hook("app:mounted", () => {
    document.addEventListener("visibilitychange", visibilityHandler, false);
  });
  let refetchIntervalTimer;
  if (enableSessionRefreshPeriodically !== false) {
    const intervalTime = enableSessionRefreshPeriodically === true ? 1e3 : enableSessionRefreshPeriodically;
    refetchIntervalTimer = setInterval(() => {
      if (data.value) {
        getSession();
      }
    }, intervalTime);
  }
  const _unmount = nuxtApp.vueApp.unmount;
  nuxtApp.vueApp.unmount = function() {
    document.removeEventListener("visibilitychange", visibilityHandler, false);
    clearInterval(refetchIntervalTimer);
    lastRefreshedAt.value = void 0;
    data.value = void 0;
    _unmount();
  };
  addRouteMiddleware("auth", authMiddleware, {
    global: enableGlobalAppMiddleware
  });
});
