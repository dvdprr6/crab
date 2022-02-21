module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
    'alias': {
      '@crab-components': './src/components',
      '@crab-common-components': './src/components/commons',
      '@crab-models': './src/models',
      '@crab-reducers': './src/reducers',
      '@crab-utils': './src/utils',
      '@crab-modules': './src/modules'
    }
  }]
  ]
}
