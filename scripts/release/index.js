const vite = require('vite')
const path = require('path')
const esbuild = require('esbuild')
const os = require('os')
const fs = require('fs')
const ElementPlus = require('unplugin-element-plus/vite')

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
    const options = {
      root: process.cwd(),
      build: {
        enableEsbuild: true,
        minify: true,
        outDir: path.join(process.cwd(), 'release/bundled')
      },
      plugins: [ElementPlus()]
    }
    await vite.build(options)
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
        productName: 'oa',
        appId: 'com.vjguo.oa',
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
    await this.buildRender()
    await this.buildMain()
    await this.buildModule()
    this.buildInstaller()
  }
}
release.start()
