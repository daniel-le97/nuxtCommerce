import { getQuery, setCookie, readBody, appendHeader, sendRedirect, eventHandler, parseCookies, createError, isMethod, getMethod, getHeaders } from "h3";
import { NextAuthHandler } from "next-auth/core";
import { getToken as nextGetToken } from "next-auth/jwt";
import getURL from "requrl";
import defu from "defu";
import { joinURL } from "ufo";
import { isNonEmptyObject } from "../../utils/checkSessionResult.mjs";
import { useRuntimeConfig } from "#imports";
let preparedAuthHandler;
let usedSecret;
const SUPPORTED_ACTIONS = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "_log"];
export const ERROR_MESSAGES = {
  NO_SECRET: "AUTH_NO_SECRET: No `secret` - this is an error in production, see https://sidebase.io/nuxt-auth/ressources/errors. You can ignore this during development",
  NO_ORIGIN: "AUTH_NO_ORIGIN: No `origin` - this is an error in production, see https://sidebase.io/nuxt-auth/ressources/errors. You can ignore this during development"
};
const readBodyForNext = async (event) => {
  let body;
  if (isMethod(event, "PATCH") || isMethod(event, "POST") || isMethod(event, "PUT") || isMethod(event, "DELETE")) {
    body = await readBody(event);
  }
  return body;
};
const parseActionAndProvider = ({ context }) => {
  const params = context.params._?.split("/");
  if (!params || ![1, 2].includes(params.length)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid path used for auth-endpoint. Supply either one path parameter (e.g., \`/api/auth/session\`) or two (e.g., \`/api/auth/signin/github\` after the base path (in previous examples base path was: \`/api/auth/\`. Received \`${params}\`` });
  }
  const [unvalidatedAction, providerId] = params;
  const action = SUPPORTED_ACTIONS.find((action2) => action2 === unvalidatedAction);
  if (!action) {
    throw createError({ statusCode: 400, statusMessage: `Called endpoint with unsupported action ${unvalidatedAction}. Only the following actions are supported: ${SUPPORTED_ACTIONS.join(", ")}` });
  }
  return { action, providerId };
};
export const getServerOrigin = (event) => {
  const envOrigin = process.env.AUTH_ORIGIN;
  if (envOrigin) {
    return envOrigin;
  }
  const runtimeConfigOrigin = useRuntimeConfig().auth.origin;
  if (runtimeConfigOrigin) {
    return runtimeConfigOrigin;
  }
  if (event && process.env.NODE_ENV !== "production") {
    return getURL(event.node.req);
  }
  throw new Error(ERROR_MESSAGES.NO_ORIGIN);
};
const detectHost = (trusted, forwardedValue, defaultValue) => {
  if (trusted && forwardedValue) {
    return Array.isArray(forwardedValue) ? forwardedValue[0] : forwardedValue;
  }
  return defaultValue || void 0;
};
export const NuxtAuthHandler = (nuxtAuthOptions) => {
  const isProduction = process.env.NODE_ENV === "production";
  usedSecret = nuxtAuthOptions?.secret;
  if (!usedSecret) {
    if (isProduction) {
      throw new Error(ERROR_MESSAGES.NO_SECRET);
    } else {
      console.info(ERROR_MESSAGES.NO_SECRET);
      usedSecret = "secret";
    }
  }
  const options = defu(nuxtAuthOptions, {
    secret: usedSecret,
    logger: void 0,
    providers: [],
    trustHost: useRuntimeConfig().auth.trustHost
  });
  const getInternalNextAuthRequestData = async (event) => {
    const nextRequest = {
      host: detectHost(
        options.trustHost,
        getURL(event.node.req),
        getServerOrigin(event)
      ),
      body: void 0,
      cookies: parseCookies(event),
      query: void 0,
      headers: getHeaders(event),
      method: getMethod(event),
      providerId: void 0,
      error: void 0
    };
    if (event.context.checkSessionOnNonAuthRequest === true) {
      return {
        ...nextRequest,
        method: "GET",
        action: "session"
      };
    }
    const query = getQuery(event);
    const { action, providerId } = parseActionAndProvider(event);
    const error = query.error;
    if (Array.isArray(error)) {
      throw createError({ statusCode: 400, statusMessage: "Error query parameter can only appear once" });
    }
    const body = await readBodyForNext(event);
    return {
      ...nextRequest,
      body,
      query,
      action,
      providerId,
      error: error || void 0
    };
  };
  const handler = eventHandler(async (event) => {
    const { res } = event.node;
    const nextRequest = await getInternalNextAuthRequestData(event);
    const nextResult = await NextAuthHandler({
      req: nextRequest,
      options
    });
    if (nextResult.status) {
      res.statusCode = nextResult.status;
    }
    nextResult.cookies?.forEach((cookie) => setCookie(event, cookie.name, cookie.value, cookie.options));
    nextResult.headers?.forEach((header) => appendHeader(event, header.key, header.value));
    if (!nextResult.redirect) {
      return nextResult.body;
    }
    if (nextRequest.body?.json) {
      return { url: nextResult.redirect };
    }
    return sendRedirect(event, nextResult.redirect);
  });
  if (preparedAuthHandler) {
    console.warn("You setup the auth handler for a second time - this is likely undesired. Make sure that you only call `NuxtAuthHandler( ... )` once");
  }
  preparedAuthHandler = handler;
  return handler;
};
export const getServerSession = async (event) => {
  if (!preparedAuthHandler) {
    await $fetch(joinURL(useRuntimeConfig().public.auth.basePath, "/session")).catch((error) => error.data);
    if (!preparedAuthHandler) {
      throw createError({ statusCode: 500, statusMessage: "Tried to get server session without setting up an endpoint to handle authentication (see https://github.com/sidebase/nuxt-auth#quick-start)" });
    }
  }
  event.context.checkSessionOnNonAuthRequest = true;
  const session = await preparedAuthHandler(event);
  delete event.context.checkSessionOnNonAuthRequest;
  if (isNonEmptyObject(session)) {
    return session;
  }
  return null;
};
export const getToken = ({ event, secureCookie, secret, ...rest }) => nextGetToken({
  req: {
    cookies: parseCookies(event),
    headers: getHeaders(event)
  },
  secureCookie: secureCookie || getServerOrigin(event).startsWith("https://"),
  secret: secret || usedSecret,
  ...rest
});
