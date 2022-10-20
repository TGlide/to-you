module.exports = {
	plugins: [
		require('postcss-extend-rule'),
		require('postcss-preset-env')({
			autoprefixer: {
				flexbox: 'no-2009'
			},
			features: {
				'custom-media-queries': true,
				'nesting-rules': true,
				'custom-properties': false
			}
		}),
		require('postcss-scrollbar')
	]
};
