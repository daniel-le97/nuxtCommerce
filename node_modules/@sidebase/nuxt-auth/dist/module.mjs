import { defineNuxtModule, useLogger, createResolver, addImportsDir, addTemplate, addPlugin, addServerPlugin } from '@nuxt/kit';
import defu from 'defu';
import { joinURL } from 'ufo';

const PACKAGE_NAME = "nuxt-auth";
const defaults = {
  isEnabled: true,
  origin: void 0,
  basePath: "/api/auth",
  trustHost: false,
  enableSessionRefreshPeriodically: false,
  enableSessionRefreshOnWindowFocus: true,
  enableGlobalAppMiddleware: false,
  globalMiddlewareOptions: {
    allow404WithoutAuth: true
  }
};
const module = defineNuxtModule({
  meta: {
    name: PACKAGE_NAME,
    configKey: "auth"
  },
  defaults,
  setup(moduleOptions, nuxt) {
    const logger = useLogger(PACKAGE_NAME);
    if (!moduleOptions.isEnabled) {
      logger.info(`Skipping ${PACKAGE_NAME} setup, as module is disabled`);
      return;
    }
    logger.info("`nuxt-auth` setup starting");
    const isOriginSet = Boolean(moduleOptions.origin);
    const options = defu(moduleOptions, {
      ...defaults,
      basePath: defaults.basePath
    });
    const url = joinURL(options.origin ?? "", options.basePath);
    if (process.env.NODE_ENV !== "production") {
      logger.info(`Auth API location is \`${url}\`, ensure that \`NuxtAuthHandler({ ... })\` is there, see https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler`);
    }
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} };
    nuxt.options.runtimeConfig.auth = defu(nuxt.options.runtimeConfig.auth, {
      ...options,
      isOriginSet
    });
    nuxt.options.runtimeConfig.public.auth = defu(nuxt.options.runtimeConfig.public.auth, {
      ...options
    });
    const { resolve } = createResolver(import.meta.url);
    const composables = resolve("./runtime/composables");
    addImportsDir(composables);
    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {};
      nitroConfig.externals = defu(typeof nitroConfig.externals === "object" ? nitroConfig.externals : {}, {
        inline: [resolve("./runtime")]
      });
      nitroConfig.alias["#auth"] = resolve("./runtime/server/services");
    });
    addTemplate({
      filename: "types/auth.d.ts",
      getContents: () => [
        "declare module '#auth' {",
        `  const getServerSession: typeof import('${resolve("./runtime/server/services")}').getServerSession`,
        `  const getToken: typeof import('${resolve("./runtime/server/services")}').getToken`,
        `  const NuxtAuthHandler: typeof import('${resolve("./runtime/server/services")}').NuxtAuthHandler`,
        "}"
      ].join("\n")
    });
    nuxt.hook("prepare:types", (options2) => {
      options2.references.push({ path: resolve(nuxt.options.buildDir, "types/auth.d.ts") });
    });
    addPlugin(resolve("./runtime/plugin"));
    addServerPlugin(resolve("./runtime/server/plugins/assertOrigin"));
    logger.success("`nuxt-auth` setup done");
  }
});

export { module as default };
