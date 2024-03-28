const express = require('express')
const cp = require('child_process')
const next = require('next')
const os = require('os')
// const { publicRuntimeConfig, serverRuntimeConfig } = require('./next.config');

function getIPAddress () {
  const interfaces = os.networkInterfaces()

  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

// const { isDev } = publicRuntimeConfig;
// const { PORT } = serverRuntimeConfig;
const isDev = process.env.NODE_ENV !== 'production'
const PORT = isDev ? 3006 : 5000

const app = next({ dev: isDev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    const serverUrl = `http://localhost:${PORT}`
    console.log(`
        App is running at:
        - Local: ${serverUrl}
        - Network: http://${getIPAddress()}:${PORT}
      `)
    // development auto open browser
    if (isDev) {
      switch (process.platform) {
        // macos
        case 'darwin':
          cp.exec(`open ${serverUrl}`)
          break
        // windows
        case 'win32':
          cp.exec(`start ${serverUrl}`)
          break
        default:
          cp.exec(`open ${serverUrl}`)
      }
    }
  })
})
