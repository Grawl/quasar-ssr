<script>
export default {
	name: 'Error404',
}
</script>
<template>
	<div class='fixed-center text-center'>
		<p>
			<img
				src='~assets/sad.svg'
				class='image'
				alt='Sad face'
			>
		</p>
		<p class='text-faded'>
			Nothing to see here...
			<strong>(404)</strong>
		</p>
		<q-btn
			color='secondary'
			class='button'
			to='/'
			label='Go back'
		/>
	</div>
</template>
<style scoped lang='sass'>
.image
	width: 30vw
	max-width: 150px
.button
	width: 200px
</style>
