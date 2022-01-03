module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === "development",
        useSpread: true,
      },
    ],
  ],
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
    }]
  ]
};
