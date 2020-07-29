/*
https://github.com/michael-ciniawsky/postcss-load-config
*/
module.exports = {
	plugins: [
		require('postcss-momentum-scrolling')([
			'scroll',
			'auto',
		]),
		require('postcss-position-alt'),
		require('postcss-short'),
		require('postcss-axis'),
		/*
		to edit target browsers: use .browserslistrc file
		*/
		require('autoprefixer'),
	],
}
