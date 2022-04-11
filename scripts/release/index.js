const vite = require('vite')
const vue = require('@vitejs/plugin-vue')
const path = require('path')
const esbuild = require('esbuild')
const { promisify } = require('util')
const { exec } = require('child_process')
const os = require('os')
const fs = require('fs')
const fse = require('fs-extra')
const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const release = {
  getEnvScript() {
    const env = require('./env.js')
    let script = ''
    for (const v in env) {
      script += `process.env.${v}="${env[v]}";`
    }
    script += `process.env.RES_DIR = process.resourcesPath;`
    return script
  },
  buildMain() {
    const entryFilePath = path.join(process.cwd(), 'src/main/app.ts')
    const outfile = path.join(process.cwd(), 'release/bundled/entry.js')
    esbuild.buildSync({
      entryPoints: [entryFilePath],
      outfile,
      minify: true,
      bundle: true,
      platform: 'node',
      sourcemap: false,
      external: ['electron']
    })
    const envScript = this.getEnvScript()
    const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`
    fs.writeFileSync(outfile, js)
  },
  async buildRender() {
    // main app
    const options = {
      root: process.cwd(),
      base: '/main/',
      build: {
        enableEsbuild: true,
        minify: true,
        outDir: path.join(process.cwd(), 'release/bundled/main')
      },
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          dirs: [],
          resolvers: [ElementPlusResolver()]
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src/renderer'),
          '@main': path.resolve(process.cwd(), 'src/main'),
          '@common': path.resolve(process.cwd(), 'src/common')
        }
      }
    }

    // micro apps
    const microAppsPath = `${process.cwd()}/micro-apps`

    // build
    const promisifiedExec = promisify(exec)
    const results = await Promise.all([
      vite.build(options),
      promisifiedExec('npm run build', { cwd: microAppsPath + '/accounting-base' })
    ])
    console.log(results[1].stdout)
  },
  buildModule() {
    const pkgJsonPath = path.join(process.cwd(), 'package.json')
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    const electronConfig = localPkgJson.devDependencies.electron.replace('^', '')
    delete localPkgJson.scripts
    delete localPkgJson.devDependencies
    localPkgJson.main = 'entry.js'
    localPkgJson.devDependencies = { electron: electronConfig }
    fs.writeFileSync(
      path.join(process.cwd(), 'release/bundled/package.json'),
      JSON.stringify(localPkgJson)
    )
    fs.mkdirSync(path.join(process.cwd(), 'release/bundled/node_modules'))
  },
  buildInstaller() {
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'release/bundled')
        },
        files: ['**'],
        extends: null,
        productName: 'accounting',
        appId: 'com.vjguo.accounting',
        asar: true,
        extraResources: require('../common/extra-resources.js'),
        win: require('../common/win-config.js'),
        mac: require('../common/mac-config.js'),
        nsis: require('../common/nsis-config.js'),
        publish: [{ provider: 'generic', url: '' }]
      },
      project: process.cwd()
    }
    const builder = require('electron-builder')
    return builder.build(options)
  },
  async start() {
    fse.removeSync(process.cwd() + '/release')
    await this.buildRender()
    await this.buildMain()
    await this.buildModule()
    this.buildInstaller()
  }
}
release.start()
