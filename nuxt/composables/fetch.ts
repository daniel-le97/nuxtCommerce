// import axios from 'axios'
// // import { config } from 'process'
// import { AppState } from '~~/AppState'
// import { refreshAuthToken } from '~~/service/AuthService'
// export const api = axios.create({
//   baseURL: '/The Url you want here/',
//   timeout: 3500
// })
// export const headersAuth = reactive({ auth: '' })
// export async function useAuthFetch (data: any) {
//   return await useFetch(data, {
//     onRequest ({ request, options }) {
//       if (AppState.user) {
//         refreshAuthToken(request)
//         // @ts-ignore
//         options.headers.authorization = headersAuth.auth
//       }
//     }
//   })
// }
