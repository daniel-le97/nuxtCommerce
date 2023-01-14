// import { initialize } from '@bcwdev/auth0provider-client'
// import { AppState } from '../AppState'
// import { audience, clientId,  } from '../.env'
// // import { router } from '../router'
// // import { accountService } from './AccountService'
// // import { api } from './AxiosService'
// // import { socketService } from './SocketService'
// const router = useRouter()
// export const AuthService = initialize({
//   domain,
//   clientId,
//   audience,
//   useRefreshTokens: true,
//   onRedirectCallback: (appState: any) => {
//     router.push(
//       appState && appState.targetUrl
//         ? appState.targetUrl
//         : window.location.pathname
//     )
//   }
// })

// AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, function () {
//   // api.defaults.headers.authorization = AuthService.bearer
//   // api.interceptors.request.use(refreshAuthToken)
//   headersAuth.auth = AuthService.bearer
//   AppState.user = AuthService.user
//   // await accountService.getAccount()
//   // NOTE if there is something you want to do once the user is authenticated, place that here
// })

// export async function refreshAuthToken (config: any) {
//   if (!AuthService.isAuthenticated) { return config }
//   const expires = AuthService.identity.exp * 1000
//   const expired = expires < Date.now()
//   const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
//   if (expired) {
//     await AuthService.loginWithPopup()
//   } else if (needsRefresh) {
//     await AuthService.getTokenSilently()
//     headersAuth.auth = AuthService.bearer
//   }
//   return config
// }
