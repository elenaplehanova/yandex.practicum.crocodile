module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
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
};
