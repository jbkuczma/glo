require('electron-reload')(__dirname) // allow for hot relaod of electron app

const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const config = require('./config')
const svg = require('./svg')

const app = electron.app // Module to control application life.
const globalShortcut = electron.globalShortcut
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

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

  return window
}

function createDevelopmentWindow() {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const maxWidthValue = 550
  const minWidthValue = 400
  window = new BrowserWindow({
    minHeight: 400,
    minWidth: minWidthValue,
    show: false
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

  // default CSS is no longer seen. seems a bit slow
  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/light.css'), 'utf-8'))
    page.executeJavaScript(svg.addBackArrowToNavBar())
    mainWindow.show()
  })

  // page.on('dom-ready', () => {
  //   // insert back arrow svg into <div class "_n7q2c"> as a <div class "_r1svv">
    
  globalShortcut.register('CommandOrControl+D', () => {
    if(config.isDarkMode){
      page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/light.css'), 'utf-8'))
      config.isDarkMode = false
    } else {
      page.insertCSS(fs.readFileSync(path.join(__dirname, '/static/dark.css'), 'utf-8'))
      config.isDarkMode = true
    }
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
});

// adds a back arrow svg to the nav bar
// function addBackArrowToNavBar(){
//   // const backArrowSVG = `
//   //   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
//   //     <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/>
//   //   </svg>`
//   var backArrowHTML = "<div class="_r1svv"><a class="_gx3bg" href="/"><div class="_o5rm6 coreSpriteMobileNavHomeActive"></div></a></div>"
//   var current = document.getElementById('_n7q2c')
//   console.log(current)
// }
