import axios from 'axios'

// import { UseFetchOptions } from 'nuxt/dist/app/composables'
export const api = axios.create({
  baseURL: 'https://localhost:1337',
  timeout: 8000

})

// export const { find } = useStrapi()
// export const { create } = useStrapi()
// export const { update } = useStrapi4()
// export const { delete: remove } = useStrapi4()
// export const { findOne } = useStrapi()

// // remove()
