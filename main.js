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
  mainWindow = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue,
    maxWidth: maxWidthValue,
    resizable: false,
    maximizable: false,
    fullscreenable: false
  })

  mainWindow.webContents.setUserAgent(userAgent)

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  mainWindow.loadURL('https://www.instagram.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function (event) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    mainWindow = null
  })

  return mainWindow
}

function createDevelopmentWindow() {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const maxWidthValue = 550
  const minWidthValue = 400
  mainWindow = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue
  })

  mainWindow.webContents.setUserAgent(userAgent)

  mainWindow.loadURL('https://www.instagram.com')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function (event) {
    mainWindow = null
  })

  return mainWindow
}
app.on('ready', () => {
  var mainWindow = (config.dev ? createDevelopmentWindow() : createWindow())
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

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
