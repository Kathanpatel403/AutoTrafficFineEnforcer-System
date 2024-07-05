module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      'react-native-reanimated/plugin',
      [
          'module-resolver',
          {
              root: ['./src'],
              extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json','.jsx'],
              alias: {
                  '@components': './src/components',
                  '@screens': './src/screens',
                  '@assets': './src/assets',
              },
          },
      ],
  ],
  };
};
