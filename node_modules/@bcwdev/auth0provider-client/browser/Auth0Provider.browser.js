(function () {
  class EventEmitter {
    constructor() {
      this._listeners = {}
    }

    /**
   * @param {string | number} event
   * @param {function} fn
   * @param {any} thisContext
   */
    on(event, fn, thisContext = null) {
      if (typeof fn !== 'function') { return }
      this._listeners[event] = this._listeners[event] || []
      // @ts-ignore
      fn.ctx = thisContext
      this._listeners[event].push(fn)
    }

    /**
   * @param {string | number} event
   * @param {function} fn
   */
    off(event, fn) {
      this._listeners[event] = this._listeners[event] || []
      const i = this._listeners[event].indexOf(fn)
      if (i === -1) { return }
      this._listeners[event].splice(i, 1)
    }

    /**
   * @param {string} event
   * @param {any} [payload]
   */
    emit(event, payload) {
      this._listeners[event] = this._listeners[event] || []
      const length = this._listeners[event].length
      for (let i = 0; i < length; i++) {
        const fn = this._listeners[event][i]
        fn.ctx
          ? fn.call(fn.ctx, payload)
          : fn(payload)
      }
    }
  }

  /** Define a default action to perform after authentication */
  const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname)


  let instance = {}

  class AuthPlugin extends EventEmitter {
    constructor(options = {}) {
      super()
      instance = this
      instance.loading = true
      instance.AUTH_EVENTS = {
        LOADING: 'LOADING',
        LOADED: 'LOADED',
        AUTHENTICATED: 'AUTHENTICATED',
        TOKEN_CHANGE: 'TOKEN_CHANGE'
      }
      instance.user = {}
      instance.userInfo = {}
      instance.identity = {}
      instance.isAuthenticated = false
      instance.bearer = ''
      instance.options = options
      instance.popupOpen = false
      instance.auth0Client = null
      instance.error = null
      instance.options.onRedirectCallback = instance.options.onRedirectCallback || DEFAULT_REDIRECT_CALLBACK
      instance.created(options)
      instance.created = true
    }

    /** Authenticates the user using a popup window */
    async loginWithPopup(o = {
      returnTo: window.location.origin
    }) {
      instance.popupOpen = true
      try {
        await instance.auth0Client.loginWithPopup(o)
        instance.user = await instance.auth0Client.getUser()
        instance.user = instance.user || {}
        await instance.getUserData()
        instance.isAuthenticated = true
      } catch (e) {
        instance.loginWithRedirect()
      } finally {
        instance.popupOpen = false
      }
    }

    /** Handles the callback when logging in using a redirect */
    async handleRedirectCallback() {
      instance.loading = true
      try {
        await instance.auth0Client.handleRedirectCallback()
        instance.user = await instance.auth0Client.getUser()
        await instance.getUserData()
        instance.isAuthenticated = true
      } catch (e) {
        instance.error = e
      } finally {
        instance.loading = false
      }
    }

    /** Authenticates the user using the redirect method */
    loginWithRedirect(o = {}) {
      if (!o.appState) {
        o.redirectUri = o.redirectUri || window.location.href
      }
      return instance.auth0Client.loginWithRedirect(o)
    }

    /**
   * Returns all the claims present in the ID token
   * @param {import("@auth0/auth0-spa-js").GetIdTokenClaimsOptions} o
   */
    getIdTokenClaims(o) {
      return instance.auth0Client.getIdTokenClaims(o)
    }

    /**
   * Returns the access token. If the token is invalid or missing, a new one is retrieved
   * @param {import("../lib").AuthServiceMethodOptions} [o]
   */
    async getTokenSilently(o) {
      const token = await instance.auth0Client.getTokenSilently(o)
      instance.getIdentityClaims(token)
      instance.emit(instance.AUTH_EVENTS.TOKEN_CHANGE, this)
      return token
    }

    /**
   * @param {string[] | string} permissions
   */
    hasPermissions(permissions) {
      if (!Array.isArray(permissions)) {
        permissions = [permissions]
      }
      if (!instance.identity.permissions) {
        return false
      }
      while (permissions.length) {
        const next = permissions.pop()
        const /**
         * @param {any} p
         */
          found = instance.identity.permissions.find(p => p === next)
        if (!found) {
          return false
        }
      }
      return true
    }

    /**
   * @param {string[] | string} roles
   */
    hasRoles(roles) {
      if (!Array.isArray(roles)) {
        roles = [roles]
      }
      if (!instance.userInfo.roles) {
        return false
      }
      while (roles.length) {
        const next = roles.pop()
        const /**
         * @param {any} r
         */
          found = instance.userInfo.roles.find(r => r === next)
        if (!found) {
          return false
        }
      }
      return true
    }

    /**
   * @param {string} token
   */
    async getIdentityClaims(token) {
      instance.identity = JSON.parse(decodeToken(token))
      return instance.identity
    }

    /**
   * Gets the access token using a popup window
   * @param {import("../lib").AuthServiceMethodOptions} o
   */
    async getTokenWithPopup(o) {
      const token = await instance.auth0Client.getTokenWithPopup(o)
      instance.getIdentityClaims(token)
      instance.emit(instance.AUTH_EVENTS.TOKEN_CHANGE, this)
      return token
    }

    async getUserData() {
      try {
        const token = await instance.getTokenSilently()
        await instance.getIdentityClaims(token)
        instance.bearer = 'Bearer ' + token
        // eslint-disable-next-line no-undef
        const res = await fetch(`https://${instance.options.domain}/userinfo`, {
          headers: {
            authorization: instance.bearer
          }
        })

        const userData = await res.json()
        for (const key in userData) {
          let keep = key
          if (key.includes('https')) {
            keep = keep.slice(keep.lastIndexOf('/') + 1)
          }
          instance.userInfo[keep] = userData[key]
        }
        instance.user = instance.user || {}
        instance.user.isAuthenticated = true
        instance.emit(instance.AUTH_EVENTS.AUTHENTICATED, this)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }

    /** Logs the user out and removes their session on the authorization server */
    logout(o = {
      returnTo: window.location.origin
    }) {
      const logout = instance.auth0Client.logout(o)
      instance.bearer = ''
      instance.user = {}
      instance.userInfo = {}
      instance.identity = {}
      instance.isAuthenticated = false
      return logout
    }

    /**
   * Use this lifecycle method to instantiate the SDK client
   * @param {{ domain?: any; clientId?: any; audience?: any; redirectUri?: any; onRedirectCallback?: any; useRefreshTokens?: boolean }} options
   */
    async created(options) {
      instance.emit(instance.AUTH_EVENTS.LOADING)
      // Create a new instance of the SDK client using members of the given options object
      // @ts-ignore
      // eslint-disable-next-line no-undef
      instance.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: options.redirectUri || window.location.origin,
        useRefreshTokens: options.useRefreshTokens || false
      })

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await instance.auth0Client.handleRedirectCallback()

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          options.onRedirectCallback(appState)
        }
      } catch (e) {
        instance.error = e
      } finally {
        // Initialize our internal authentication state
        instance.isAuthenticated = await instance.auth0Client.isAuthenticated()

        if (!instance.isAuthenticated) {
          instance.loading = false
          instance.emit(instance.AUTH_EVENTS.LOADED)
          return
        }

        instance.user = await instance.auth0Client.getUser()
        await instance.getUserData()
        instance.loading = false
        instance.emit(instance.AUTH_EVENTS.LOADED)
      }
    }
  }

  const onAuthLoaded = cb => {
    return new Promise((resolve, reject) => {
      const authService = instance
      if (!authService.loading) {
        if (typeof cb === 'function') { cb(authService) }
        return resolve(authService)
      }
      authService.on(authService.AUTH_EVENTS.LOADED, () => {
        resolve(authService)
        if (typeof cb === 'function') { cb(authService) }
      })
    })
  }

  function b64DecodeUnicode(str = '.') {
    try {
      return decodeURIComponent(
        // eslint-disable-next-line no-undef
        atob(str).replace(/(.)/g, function (m, p) {
          let code = p
            .charCodeAt(0)
            .toString(16)
            .toUpperCase()
          if (code.length < 2) {
            code = '0' + code
          }
          return '%' + code
        })
      )
    } catch (e) {
      return ''
    }
  }
  function decodeToken(str = '.') {
    try {
      str = str.split('.')[1]
      let output = str.replace(/-/g, '+').replace(/_/g, '/')
      switch (output.length % 4) {
        case 0:
          break
        case 2:
          output += '=='
          break
        case 3:
          output += '='
          break
        default:
          throw new Error('Illegal base64url string!')
      }
      return b64DecodeUnicode(output)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[AUTH0-PROVIDER-ERROR] unable to decode token', e)
      return str
    }
  }

  const Auth0Provider = {
    /**
   * @param {{ onRedirectCallback: () => void; domain: string, audience: string, clientId: string  }} options
   */
    initialize(options) {
      if (instance && instance.created) { return instance }
      return new AuthPlugin(options)
    },
    /**
  * @param {{ fullPath: any; }} to
  * @param {any} from
  * @param {() => any} next
  */
    async authGuard(to, from, next) {
      try {
        const authService = instance
        await onAuthLoaded()
        if (authService.isAuthenticated) {
          return next()
        }
        return instance.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
      } catch (e) {
        return instance.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
      }
    },
    decodeToken
  }

  // @ts-ignore
  window.Auth0Provider = Auth0Provider

  /**
   * @typedef {{
    * display?: 'page' | 'popup' | 'touch' | 'wap',
    * prompt?: 'none' | 'login' | 'consent' | 'select_account',
    * max_age?: string | number  ,
    * ui_locales?: string,
    * id_token_hint?: string,
    * login_hint?: string,
    * acr_values?: string,
    * scope?: string,
    * audience?: string,
    * connection?: string,
    * [key: string]: any
    * }} AuthServiceMethodOptions
    */
}())
