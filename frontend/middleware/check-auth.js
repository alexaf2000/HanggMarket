import axios from 'axios'

export default async({ store, req }) => {
    // get from store the auth/token
    const token = store.getters['auth/token']

    // if we don't have user data but we have token, let's fetch the data
    if (!store.getters['auth/check'] && token) {
        await store.dispatch('auth/fetchUser')
    }
}
