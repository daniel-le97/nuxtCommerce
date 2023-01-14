// import CredentialsProvider from 'next-auth/providers/credentials'

import Auth0Provider from 'next-auth/providers/auth0'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error
    Auth0Provider.default({
      clientId: process.env.Auth_Client_Id || '',
      clientSecret: process.env.Auth_Client_Secret || '',
      issuer: process.env.Auth_Issuer || ''
    })
    // CredentialsProvider.default({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
    //     password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
    //   },
    //   authorize (credentials: any) {
    //     console.warn('ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe')
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

    //     const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }

    //     if (credentials?.username === user.username && credentials?.password === user.password) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       console.error('Warning: Malicious login attempt registered, bad credentials provided')

    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   }
    // })
  ]
})
