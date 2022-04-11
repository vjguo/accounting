import { protocol } from 'electron'
import path from 'path'
import fs from 'fs'

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      supportFetchAPI: true,
      secure: true,
      corsEnabled: true
    }
  }
])

export function registerProtocol() {
  protocol.registerBufferProtocol('app', (request, response) => {
    let pathName = new URL(request.url).pathname
    const extension = path.extname(pathName).toLowerCase()
    let mimeType = ''
    if (extension) {
      pathName = decodeURI(pathName)
      if (extension === '.js') {
        mimeType = 'text/javascript'
      } else if (extension === '.html') {
        mimeType = 'text/html'
      } else if (extension === '.css') {
        mimeType = 'text/css'
      } else if (extension === '.svg') {
        mimeType = 'image/svg+xml'
      } else if (extension === '.json') {
        mimeType = 'application/json'
      }
    } else {
      pathName = '/main/index.html'
      mimeType = 'text/html'
    }
    const filePath = path.join(__dirname, pathName)
    fs.readFile(filePath, (error, data) => {
      if (error) {
        response({})
        return
      }
      response({ mimeType, data })
    })
  })
}
