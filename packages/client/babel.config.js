module.exports = {
  //presets: ['@babel/preset-env', '@babel/preset-react'],
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: true,
        fileName: false,
      },
    ],
  ],
}
