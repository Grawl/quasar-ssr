import Vue from 'vue'
import Vuex from 'vuex'
import { Cookies } from 'quasar'
import auth from './auth'

Vue.use(Vuex)
/*
If not building with SSR mode, you can directly export the Store instantiation
The function below can be async too; either use async/await or return a Promise which resolves with the Store instance.
*/
export default function ({ ssrContext /* , Vue */ }) {
	const store = new Vuex.Store({
		modules: {
			auth,
		},
		// strict: process.env.DEV
	})
	const cookies = process.env.SERVER
		? Cookies.parseSSR(ssrContext)
		: Cookies
	store.$cookies = cookies
	return store
}
