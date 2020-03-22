import Cookies from 'js-cookie'

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        const token = cookieFromRequest(req, 'token')
        if (token) {
            commit('auth/SET_TOKEN', token)
        }

    },

    nuxtClientInit({ commit }) {
        const token = Cookies.get('token')
        if (token) {
            commit('auth/SET_TOKEN', token)
        }

    }
}
