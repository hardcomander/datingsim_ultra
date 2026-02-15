const { app, BrowserWindow } = require('electron')
const path = require('path')
const { pathToFileURL } = require('url')

const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#020617',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    // Load from asar archive or unpacked directory
    // Use file:// URL to ensure proper path resolution for relative assets
    const distPath = path.join(__dirname, '..', 'dist', 'index.html')
    const fileUrl = pathToFileURL(distPath).href
    console.log('[Electron] Loading URL:', fileUrl)
    win.loadURL(fileUrl)
    
    // Open dev tools to see any errors
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
