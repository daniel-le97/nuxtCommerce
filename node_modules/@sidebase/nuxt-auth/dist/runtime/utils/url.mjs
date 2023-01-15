import { joinURL } from "ufo";
import _getURL from "requrl";
import { useRequestEvent } from "#app";
import { useRuntimeConfig, navigateTo as _navigateTo } from "#imports";
const getApiURL = () => {
  const origin = useRuntimeConfig().public.auth.origin ?? (process.env.NODE_ENV !== "production" ? getRequestURL(false) : "");
  return joinURL(origin, useRuntimeConfig().public.auth.basePath);
};
export const getRequestURL = (includePath = true) => _getURL(useRequestEvent()?.node.req, includePath);
export const joinPathToApiURL = (path) => joinURL(getApiURL(), path);
export const navigateTo = (href, options) => {
  const { external = true, replace = false } = options ?? {};
  if (process.server || !external) {
    return _navigateTo(href, { external, replace });
  }
  if (replace) {
    window.location.replace(href);
  } else {
    window.location.href = href;
  }
  if (href.includes("#")) {
    window.location.reload();
  }
  return Promise.resolve();
};
