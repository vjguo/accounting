import packageJson from '../../package.json'

export default {
  APP_VERSION: packageJson.version,
  NODE_ENV: 'production',
  ELECTRON_DISABLE_SECURITY_WARNINGS: true
}
