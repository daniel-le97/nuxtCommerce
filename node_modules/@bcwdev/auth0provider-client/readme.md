# @bcwdev/auth0provider-client 

**_AuthService.js_**
```js
import { initialize } from '@bcwdev/auth0provider-client'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

// Listen for secific AUTH_EVENTS hooks
AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async () => {
  // AuthService.user is now defined
  AppState.user = AuthService.user
  $resource.defaultHeaders.Authorization = AuthService.bearer
  await profileService.getProfile()
})
AuthService.on(AuthService.AUTH_EVENTS.LOADED, () => {
  AppState.$auth = reactive(AuthService)
})

```

#### CDN
```html
<script src="https://cdn.jsdelivr.net/gh/jakeoverall/auth0provider-client/browser/Auth0Provider.browser.js">
```

----------------------------------------------------

This library is a small wrapper around auth0-spa-js. It is extended beyond the simple scale that is used in the auth0 tutorial. Added features include getting the `userInfo` and `identity` on login.

> REQUIRED: Enable RBAC in you application for the full set of features in this app. You can also add the following rule to retrieve more information in your userInfo

```javascript
// AUTH0 RULE
function (user, context, callback) {
  // please note auth0 will strip any non namespaced properties
  const namespace = 'https://YOURDOMAIN.auth0.com';
  const assignedRoles = (context.authorization || {}).roles;

  let idTokenClaims = context.idToken || {};

  idTokenClaims[`${namespace}/roles`] = assignedRoles;
  context.idToken = idTokenClaims;
  context.idToken[namespace + '/user_metadata'] = user.user_metadata;
  context.idToken[namespace + '/app_metadata'] = user.app_metadata;

  // namespaced properties are reduced to simple properties by this libary
  // so in vue you can access userInfo.app_metadata directly

  callback(null, user, context);
}
```


### AuthService

You can access any of the following state properties directly from the initialized 
```javascript
export const AuthService = Auth0Provider.initialize(options)
```

--------------------

```javascript
// AuthService Properties
{
  loading: true,
  user: {
    isAuthenticated: false,
    // ... Auth0User
  },
  userInfo: {
    // ... Extra details provided by your Auth0Rules
  },
  bearer: "",
}

// AuthService Login Methods
{
  /** Awaitable Authentication opening a popup window */
  async loginWithPopup(o) { }
  /** Authenticates the user using the redirect method */
  loginWithRedirect(o) { }
  /** Returns all the claims present in the ID token */
  getIdTokenClaims(o) {  }
  /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
  getTokenSilently(o) { }
}

// AuthService Helper Methods
{
  /**
   * Depends on UserData
   * @param {string[] | string} permissions
   * @returns {boolean}
  */
 hasPermissions(permissions) {},

  /**
   * Depends on UserData
   * @param {string[] | string} roles
   * @returns {boolean}
  */
  hasRoles(roles) {},
}

// Event Hooks
{
  LOADING: "LOADING",
  LOADED: "LOADED",
  AUTHENTICATED: "AUTHENTICATED"
  // LOGOUT FORCES A REFRESH SO NO HOOK HERE
}

```

> Caution: Auth0Provider `identity` is easily modifed on the client and therefore cannot be trusted when making server side decisions. Your server should use the bearer token and the auth0 api to validate requests [see @bcwdev/auth0provider]('https://www.npmjs.com/package/@bcwdev/auth0provider')