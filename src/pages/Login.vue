<script>
const form = {
	isPassword: true,
	loading: false,
	error: null,
	errors: {
		login: [],
		password: [],
	},
}
export default {
	name: 'Login',
	data: () => {
		return {
			form: {
				login: '',
				password: '',
				rememberMe: false,
				...form,
			},
		}
	},
	methods: {
		async onSubmit() {
			this.form.loading = true
			const response = await this.$store.dispatch('auth/login', {
				login: this.form.login,
				password: this.form.password,
				rememberMe: this.form.rememberMe,
			})
			if (response) {
				this.status = response.status
				switch (response.status) {
					case 204:
					case 403:
						this.$router.push('/')
						break
					case 422:
						this.form = {
							...this.form,
							...form,
							error: 'Fields has errors',
							errors: {
								...form.errors,
								...response.data.errors,
							},
						}
						break
					case 401:
					case 404:
						this.setErrorMessage('Wrong username or password')
						break
					default:
						this.setErrorMessage('Unexpected server response')
				}
			} else {
				this.setErrorMessage('Server is not responding')
			}
			this.form.loading = false
		},
		setErrorMessage($message) {
			this.form.error = $message
			this.form.errors = form.errors
		},
	},
}
</script>
<template>
	<div class='fixed-center'>
		<div class='row'>
			<h5 class='text-h5 text-white full-width text-center q-my-md'>Quasar SSR</h5>
		</div>
		<q-card bordered class='q-pa-lg shadow-1'>
			<div class='q-pa-lg shadow-1'>
				<q-form class='q-gutter-md' ref='loginForm' @submit='onSubmit'>
					<q-input
						outlined dense label='Login'
						v-model='form.login'
						:error='!!form.errors.login.length'
						:error-message='form.errors.login[0]'
					/>
					<q-input
						outlined dense label='Password'
						:type='form.isPassword ? `password` : `text`'
						v-model='form.password'
						:error='!!form.errors.password.length'
						:error-message='form.errors.password[0]'
					>
						<template v-slot:append>
						<q-icon
							:name='form.isPassword ? `visibility_off` : `visibility`'
							class='cursor-pointer'
							@click='form.isPassword = !form.isPassword'
						/>
						</template>
					</q-input>
					<div class='form-actions'>
						<q-checkbox v-model='form.rememberMe' label='Remember me'/>
						<q-btn
							unelevated
							:loading='form.loading'
							color='primary'
							type='submit'
							label='Enter'
							class='q-ml-md'
						/>
					</div>
				</q-form>
			</div>
		</q-card>
		<br/>
		<q-banner rounded class='text-white bg-red text-center' v-show='form.error'>
			{{ form.error }}
		</q-banner>
	</div>
</template>
<style scoped lang='sass'>
.form-actions
	white-space: nowrap
</style>
