
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['strapi']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['strapi']?: ModuleOptions }
}


export { AuthOptions, ModuleOptions, default } from './module'
