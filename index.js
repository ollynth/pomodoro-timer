const {app, BrowserWindow} = require('electron')

let mainWindow

// create the browser window
function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')
    mainWindow.on('closed, () => (mainWindow = null))')
}

app.whenReady().then(createWindow)

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