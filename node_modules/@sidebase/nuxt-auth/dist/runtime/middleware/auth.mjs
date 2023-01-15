import { defineNuxtRouteMiddleware, useRuntimeConfig, useNuxtApp } from "#app";
import { joinURL, withQuery } from "ufo";
import { sendRedirect } from "h3";
import useSession from "../composables/useSession.mjs";
export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.auth === false) {
    return;
  }
  const { status } = useSession();
  if (status.value === "authenticated") {
    return;
  }
  const authConfig = useRuntimeConfig().public.auth;
  const nuxtApp = useNuxtApp();
  const router = nuxtApp.$router;
  if (authConfig.globalMiddlewareOptions.allow404WithoutAuth) {
    const matchedRoute = router.getRoutes().find((route) => route.path === to.path);
    if (!matchedRoute) {
      return;
    }
  }
  const signInUrl = joinURL(authConfig.basePath, "signin");
  const url = withQuery(signInUrl, {
    callbackUrl: to.path,
    error: "SessionRequired"
  });
  if (process.server) {
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, url, 302));
    }
  }
  window.location.href = url;
  if (url.includes("#")) {
    window.location.reload();
  }
  const avoidContentFlashAtAllCosts = new Promise((resolve) => setTimeout(resolve, 60 * 1e3)).then(() => router.push(url));
  return avoidContentFlashAtAllCosts;
});
