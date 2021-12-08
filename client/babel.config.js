module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        modules: 'commonjs'
      },
    ],
    [
      '@babel/preset-react',
      {
        development: true,
      },
    ],
  ],
};
