import type { AppProvider, BuiltInProviderType } from 'next-auth/providers';
import type { ComputedRef, Ref } from 'vue';
import type { SessionData, SessionLastRefreshedAt, SessionStatus } from './useSessionState';
/**
 * Utility type that allows autocompletion for a mix of literal, primitiva and non-primitive values.
 * @source https://github.com/microsoft/TypeScript/issues/29729#issuecomment-832522611
 */
type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);
type SupportedProviders = LiteralUnion<BuiltInProviderType>;
type GetSessionOptions = Partial<{
    required?: boolean;
    callbackUrl?: string;
    onUnauthenticated?: () => void;
}>;
interface SignInOptions extends Record<string, unknown> {
    /**
     * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
     *
     * [Documentation](https://next-auth.js.org/getting-started/client#specifying-a-callbackurl)
     */
    callbackUrl?: string;
    /** [Documentation](https://next-auth.js.org/getting-started/client#using-the-redirect-false-option) */
    redirect?: boolean;
}
type SignInAuthorizationParams = Record<string, string>;
interface SignOutOptions {
    callbackUrl?: string;
    redirect?: boolean;
}
/**
 * Get the current Cross-Site Request Forgery token.
 *
 * You can use this to pass along for certain requests, most of the time you will not need it.
 */
declare const getCsrfToken: () => Promise<string>;
/**
 * Trigger a sign in flow for the passed `provider`. If no provider is given the sign in page for all providers will be shown.
 *
 * @param provider - Provider to trigger sign in flow for. Leave empty to show page with all providers
 * @param options - Sign in options, everything you pass here will be passed with the body of the sign-in request. You can use this to include provider-specific data, e.g., the username and password for the `credential` flow
 * @param authorizationParams - Everything you put in here is passed along as url-parameters in the sign-in request
 */
declare const signIn: (provider?: SupportedProviders, options?: SignInOptions, authorizationParams?: SignInAuthorizationParams) => Promise<any>;
/**
 * Get all configured providers from the backend. You can use this method to build your own sign-in page.
 */
declare const getProviders: () => Promise<Record<SupportedProviders, Omit<AppProvider, "options"> | undefined>>;
/**
 * Refresh and get the current session data.
 *
 * @param getSessionOptions - Options for getting the session, e.g., set `required: true` to enforce that a session _must_ exist, the user will be directed to a login page otherwise.
 */
declare const getSession: (getSessionOptions?: GetSessionOptions) => Promise<SessionData>;
/**
 * Sign out the current user.
 *
 * @param options - Options for sign out, e.g., to `redirect` the user to a specific page after sign out has completed
 */
declare const signOut: (options?: SignOutOptions) => Promise<any>;
export interface UseSessionReturn {
    data: Readonly<Ref<SessionData>>;
    lastRefreshedAt: Readonly<Ref<SessionLastRefreshedAt>>;
    status: ComputedRef<SessionStatus>;
    getSession: typeof getSession;
    getCsrfToken: typeof getCsrfToken;
    getProviders: typeof getProviders;
    signIn: typeof signIn;
    signOut: typeof signOut;
}
declare const _default: () => UseSessionReturn;
export default _default;
