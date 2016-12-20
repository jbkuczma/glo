require('electron-reload')(__dirname) // allow for hot relaod of electron app

const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const config = require('./config')

const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.
let mainWindow

function createWindow () {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const maxWidthValue = 550
  const minWidthValue = 400
  window = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue,
    maxWidth: maxWidthValue,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  })

  window.webContents.setUserAgent(userAgent)
  window.loadURL('https://www.instagram.com')

  // Emitted when the window is closed.
  window.on('close', function (event) {
    event.preventDefault()
    app.hide()
  })

  return mainWindow
}

function createDevelopmentWindow() {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const maxWidthValue = 550
  const minWidthValue = 400
  window = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue
  })

  window.webContents.setUserAgent(userAgent)

  window.loadURL('https://www.instagram.com')

  // Open DevTools.
  window.webContents.openDevTools()

  window.on('close', function (event) {
    event.preventDefault()
    app.hide()
  })

  return window
}
app.on('ready', () => {
  mainWindow = (config.dev ? createDevelopmentWindow() : createWindow())
  const page = mainWindow.webContents

  
  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/dark.css'), 'utf-8'))
  })
  
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', function () {
  if(process.platform === 'darwin'){
    mainWindow.show()
  }
})
