<script>
import EssentialLink from 'components/EssentialLink'

export default {
	name: 'MainLayout',
	components: {
		EssentialLink,
	},
	data() {
		return {
			drawer: {
				open: true,
				overlay: false,
			},
			navigationLinks: [
				{
					title: 'Home',
					icon: 'school',
					link: '/',
				},
				{
					title: 'Profile',
					caption: 'User information',
					icon: 'school',
					link: '/profile',
				},
			],
		}
	},
	created() {
		if (this.$q.platform.is.mobile) {
			this.drawer.open = {
				open: false,
				overlay: true,
			}
		}
	},
	methods: {
		async logout() {
			const response = await this.$store.dispatch('auth/logout')
			if (response && response.status === 204) {
				this.$router.push('/login')
			}
		},
	},
}
</script>
<template>
	<q-layout view='hHh lpR fff'>
		<q-header>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon='menu'
					aria-label='Menu'
					@click='drawer.open = !drawer.open'
				/>
				<q-toolbar-title>
					Quasar SSR
				</q-toolbar-title>
				<div>Quasar v{{ $q.version }}</div>
			</q-toolbar>
		</q-header>
		<q-drawer show-if-above v-model='drawer.open' :overlay='drawer.overlay' :width='300'>
			<q-list class='q-py-lg'>
				<EssentialLink
					v-for='link in navigationLinks'
					:key='link.title'
					v-bind='link'
				/>
				<q-separator spaced/>
				<q-item clickable tag='a' v-on:click='logout'>
					<q-item-section avatar>
						<q-icon name='exit_to_app'/>
					</q-item-section>
					<q-item-section>
						<q-item-label>Exit</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>
		<q-page-container>
			<router-view/>
		</q-page-container>
	</q-layout>
</template>
