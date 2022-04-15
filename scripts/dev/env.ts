import packageJson from '../../package.json'

export default {
  APP_VERSION: packageJson.version,
  NODE_ENV: 'development',
  ELECTRON_DISABLE_SECURITY_WARNINGS: true
}
