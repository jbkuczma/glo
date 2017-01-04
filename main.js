const electron = require('electron')
const app = require('app')
const BrowserWindow = require('browser-window')
const ipcMain = require('ipc-main')
const globalShortcut = require('global-shortcut')
const path = require('path')
const url = require('url')
const fs = require('fs')
const config = require('./config')
// require('electron-reload')(__dirname)

// const app = electron.app // Module to control application life.
// const globalShortcut = electron.globalShortcut
// const ipcMain = electron.ipcMain
// const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

let mainWindow

// from: https://github.com/electron/electron/blob/v0.36.10/docs/api/app.md#appmakesingleinstancecallback
const shouldQuit = app.makeSingleInstance( (commandLine, workingDirectory) => {
  if(mainWindow){
    if(mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.focus()
  }
})

if(shouldQuit){
  app.quit()
}

function createWindow () {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' //mobile user agent. allows for the nav bar on Instagram's website
  const maxWidthValue = 550
  const minWidthValue = 400
  const icon = path.join(__dirname, 'static/icons/png/256x256.png')
  window = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue,
    maxWidth: maxWidthValue,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    show: false,
    icon: icon,
    webPreferences: {
      preload: path.join(__dirname, 'ipc.js')
    }
  })

  window.webContents.setUserAgent(userAgent)
  window.loadURL('https://www.instagram.com')

  // Emitted when the window is closed.
  window.on('close', function (event) {
    event.preventDefault()
    app.hide()
  })

  return window
}

function createDevelopmentWindow() {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const maxWidthValue = 550
  const minWidthValue = 400
  const icon = path.join(__dirname, 'static/icons/png/256x256.png')
  window = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue,
    show: false,
    icon: icon,
    webPreferences: {
      preload: path.join(__dirname, 'ipc.js')
    }
  })

  window.webContents.setUserAgent(userAgent)

  window.loadURL('https://www.instagram.com')
  
  

  // Open DevTools.
  window.webContents.openDevTools()

  window.on('close', function (event) {
    event.preventDefault()
    if(process.platform === 'darwin'){
      app.hide()
    } else {
      window.hide()
    }
  })

  return window
}
app.on('ready', () => {
  mainWindow = (config.dev ? createDevelopmentWindow() : createWindow())
  const page = mainWindow.webContents

  ipcMain.on('goBack', function(event, args) {
    if(page.canGoBack()){
      page.goBack()
    }
  })

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/light.css'), 'utf-8'))
    mainWindow.show()
  })
 
  globalShortcut.register('CommandOrControl+D', () => {
    if(config.isDarkMode){
      page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/light.css'), 'utf-8'))
      config.isDarkMode = false
    } else {
      page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/dark.css'), 'utf-8'))
      config.isDarkMode = true
    }
  })

  // might be used for keeping the nav bar from changing
  page.on('did-navigate-in-page', function(event, url) {
    event.preventDefault()
    console.log(url)
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

app.on('before-quit', function () {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
})
