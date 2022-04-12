const vite = require('vite')
const vue = require('@vitejs/plugin-vue')
const path = require('path')
const esbuild = require('esbuild')
const { spawn } = require('child_process')
const os = require('os')
const fs = require('fs')
const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const dev = {
  server: null,
  serverPort: 8080,
  electronProcess: null,
  isReload: false,
  async createServer() {
    const options = {
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
    }
    this.server = await vite.createServer(options)
    await this.server.listen()
  },
  getEnvScript() {
    const env = require('./env.js')
    env.WEB_PORT = this.serverPort
    env.RES_DIR = path.join(process.cwd(), 'resource/release')
    let script = ''
    for (const v in env) {
      script += `process.env.${v}="${env[v]}";`
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
        this.server.close()
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
