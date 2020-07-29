import Vue from 'vue'

export default {
	namespaced: true,
	state: () => ({
		token: null,
		user: {},
	}),
	mutations: {
		setToken(state, token = null) {
			this.$cookies.set('laravel_token', token)
			state.token = token
		},
		setUser(state, user) {
			state.user = user
		},
	},
	actions: {
		async fetchUser({ commit }) {
			const response = await Vue.prototype.$http.get('/auth/user').catch(error => error.response)
			commit('setUser', response.data)
			return response
		},
		async login({ commit }, form) {
			const response = await Vue.prototype.$http.post('/auth/login', {
				login: form.login,
				password: form.password,
				rememberMe: !!form.rememberMe,
			}).catch(error => error.response)
			if (response && response.status === 204) {
				commit('setToken', response.headers.authorization.replace('Bearer ', ''))
			}
			return response
		},
		async logout({ commit }) {
			const response = await Vue.prototype.$http.get('/auth/logout')
				.catch(error => error.response)
			this.$cookies.remove('laravel_token')
			if (response.status === 204) {
				commit('setToken', null)
			}
			return response
		},
	},
}
