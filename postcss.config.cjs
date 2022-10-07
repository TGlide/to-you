module.exports = {
  plugins: {
    "postcss-extend-rule": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      features: {
        "custom-media-queries": true,
        "nesting-rules": true,
        "custom-properties": false,
      },
    },
    "postcss-scrollbar": {},
  },
};
