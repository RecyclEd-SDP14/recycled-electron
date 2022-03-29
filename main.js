const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 480,
        fullscreen: true,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
}

const curr_stats = {
    "plastic": 0,
    "glass": 0,
    "can": 0,
    "trash": 0
};

const data = JSON.stringify(curr_stats);

fs.writeFile('curr_stats.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})