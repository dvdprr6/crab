module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
    'alias': {
      '@crap-components': './src/components',
      '@crap-common-components': './src/components/commons'
    }
    }]
  ]
}
