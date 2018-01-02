const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow = null

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('online-status-changed', (event, status) => {
    console.log(status)
  })
}

// mainWindow.webContents.openDevTools()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
