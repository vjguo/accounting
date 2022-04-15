import { build as viteBuild } from 'vite'
import { build as electronBuild } from 'electron-builder'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import esbuild from 'esbuild'
import { promisify } from 'util'
import { exec } from 'child_process'
import os from 'os'
import fs from 'fs'
import fse from 'fs-extra'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import env from './env'
import extraResources from '../common/extra-resources'
import win from '../common/win-config'
import mac from '../common/mac-config'
import nsis from '../common/nsis-config'

const release = {
  getEnvScript() {
    let script = ''
    for (const v in env) {
      script += `process.env.${v}="${env[v as keyof typeof env]}";`
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
      viteBuild(options),
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
    return electronBuild({
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
        extraResources,
        win,
        mac,
        nsis,
        publish: [{ provider: 'generic', url: '' }]
      },
      projectDir: process.cwd()
    })
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
