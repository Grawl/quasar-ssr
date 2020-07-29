import axios from 'axios'
import { Cookies } from 'quasar'

export default ({ Vue, ssrContext }) => {
	const cookies = process.env.SERVER
		? Cookies.parseSSR(ssrContext)
		: Cookies
	const httpClient = axios.create({
		baseURL: process.env.API_URL || 'http://example.com/api',
		withCredentials: true,
		validateStatus: (status) => (status >= 200 && status < 300) || status === 422,
	})
	httpClient.interceptors.request.use(config => {
		const token = cookies.get('laravel_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})
	Vue.prototype.$http = httpClient
	Vue.prototype.$cookies = cookies
}
