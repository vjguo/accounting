import { createServer } from 'vite'
import type { ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import esbuild from 'esbuild'
import { spawn } from 'child_process'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import os from 'os'
import fs from 'fs'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import env from './env'

type extraEnv = {
  WEB_PORT: number
  RES_DIR: string
} & typeof env

const dev = {
  server: null as ViteDevServer | null,
  serverPort: 8080,
  electronProcess: null as ChildProcessWithoutNullStreams | null,
  isReload: false,
  async createServer() {
    this.server = await createServer({
      configFile: false,
      root: process.cwd(),
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: tag => tag.startsWith('a-')
            }
          }
        }),
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
      },
      server: {
        port: this.serverPort,
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            rewrite: path => path.replace(/^\/api/, ''),
            changeOrigin: true
          }
        }
      }
    })
    await this.server.listen()
  },
  getEnvScript() {
    const extraEnv = {
      ...env,
      WEB_PORT: this.serverPort,
      RES_DIR: path.join(process.cwd(), 'resource/release')
    }
    let script = ''
    for (const v in extraEnv) {
      script += `process.env.${v}="${extraEnv[v as keyof extraEnv]}";`
    }
    return script
  },
  buildMain() {
    const entryFilePath = path.join(process.cwd(), 'src/main/app.ts')
    const outfile = path.join(process.cwd(), 'release/bundled/entry.js')
    esbuild.buildSync({
      entryPoints: [entryFilePath],
      outfile,
      minify: false,
      bundle: true,
      platform: 'node',
      sourcemap: true,
      external: ['electron']
    })
    const envScript = this.getEnvScript()
    const js = `${envScript}${os.EOL}${fs.readFileSync(outfile)}`
    fs.writeFileSync(outfile, js)
  },
  createElectronProcess() {
    this.electronProcess = spawn(
      require('electron').toString(),
      [path.join(process.cwd(), 'release/bundled/entry.js')],
      { cwd: process.cwd() }
    )
    this.electronProcess.on('close', () => {
      if (!this.isReload) {
        this.server?.close()
        process.exit()
      }
    })
    this.electronProcess.stdout.on('data', data => {
      data = data.toString()
      console.log(data)
    })
  },
  runMainFilesMonitor() {
    const chokidar = require('chokidar')
    chokidar.watch(path.join(process.cwd(), 'src/main')).on('change', () => {
      if (this.electronProcess && !this.electronProcess.killed && !this.isReload) {
        this.electronProcess.on('exit', async () => {
          await this.buildMain()
          this.createElectronProcess()
          this.isReload = false
        })
        this.isReload = true
        this.electronProcess.kill('SIGKILL')
      }
    })
  },
  async start() {
    await this.createServer()
    await this.buildMain()
    this.createElectronProcess()
    this.runMainFilesMonitor()
  }
}
dev.start()
