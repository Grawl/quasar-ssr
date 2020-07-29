<script>
export default {
	name: 'PageIndex',
	// preFetch({ store }) {
	//	if (!Object.keys(store.state.auth.user).length) {
	//		console.log('preFetch auth/fetchUser')
	//		return store.dispatch('auth/fetchUser')
	//	}
	// },
	computed: {
		user() {
			return this.$store.state.auth.user
		},
	},
}
</script>
<template>
	<q-page padding>
		<h4>Profile</h4>
		<pre>{{ user }}</pre>
	</q-page>
</template>
