export interface AuthServiceMethodOptions {
  display?: 'page' | 'popup' | 'touch' | 'wap'
  prompt?: 'none' | 'login' | 'consent' | 'select_account'
  max_age?: string | number
  ui_locales?: string
  id_token_hint?: string
  login_hint?: string
  acr_values?: string
  scope?: string
  audience?: string
  connection?: string
  [key: string]: any
}

export class EventEmitter {
  _listeners: { [key: string]: any[] };
  on(event: string | number, fn: Function, thisContext?: any): void
  off(event: string | number, fn: Function): void
  emit(event: string, payload: any): void
}

export type AUTH_EVENTS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  AUTHENTICATED: 'AUTHENTICATED',
  TOKEN_CHANGE: 'TOKEN_CHANGE'
}

export class AuthPlugin extends EventEmitter {
  AUTH_EVENTS: AUTH_EVENTS
  options: Auth0ConfigurationOptions
  loading: boolean
  isAuthenticated: boolean
  user: any
  userInfo: any
  identity: any
  bearer: string
  auth0Client: any
  popupOpen: boolean
  error?: Error
  created(options): AuthPlugin


  /** Authenticates the user using a popup window */
  loginWithPopup(options?: AuthServiceMethodOptions): Promise<void>

  /** Handles the callback when logging in using a redirect */
  handleRedirectCallback(): Promise<void>

  /** Authenticates the user using the redirect method */
  loginWithRedirect(o?: AuthServiceMethodOptions): Promise<void>

  /**
   * Returns all the claims present in the ID token
   */
  getIdTokenClaims(o?: AuthServiceMethodOptions): any

  /**
   * Returns the access token. If the token is invalid or missing, a new one is retrieved
   */
  getTokenSilently(o?: AuthServiceMethodOptions): Promise<string>

  /**
   * @param {string[] | string} permissions
   */
  hasPermissions(permissions: string[] | string): Promise<boolean>

  /**
   * @param {string[] | string} roles
   */
  hasRoles(roles: string[] | string): Promise<boolean>


  getIdentityClaims(token: string): Promise<any>

  /**
   * Gets the access token using a popup window
   */
  getTokenWithPopup(o?: AuthServiceMethodOptions): Promise<string>

  getUserData(): Promise<void>

  /** Logs the user out and removes their session on the authorization server */
  logout(o: AuthServiceMethodOptions): void

  /**
   * Use this lifecycle method to instantiate the SDK client
   */
  created(options: AuthServiceMethodOptions): Promise<void>
}

export interface Auth0ConfigurationOptions {
  onRedirectCallback: (appstate: { targetUrl: string }) => void
  domain: string
  audience: string
  clientId: string
  useRefreshTokens?: boolean
}

export function onAuthLoaded(cb: () => any): Promise<AuthPlugin>
export function b64DecodeUnicode(str: string): string
export function decodeToken(str: string): string

export function initialize(options: Auth0ConfigurationOptions): AuthPlugin

export function authGuard(to: any, from: any, next: () => any): Promise<any>

export function authSettled(to: any, from: any, next: () => any): Promise<any>

export function hasPermissions(permissions: string | string[]): boolean

export function hasRoles(roles: string | string[]): boolean
