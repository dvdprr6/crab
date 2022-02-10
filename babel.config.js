module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
    'alias': {
      '@crab-components': './src/components',
      '@crab-common-components': './src/components/commons'
    }
    }]
  ]
}
