const { app, BrowserWindow, Menu, webContents } = require("electron");
const path = require("path");
var mainWindow;
function createBrowserWindow() {

    mainWindow = new BrowserWindow({
        title: "Electron", width: 1200, height: 700, icon: path.join(__dirname, 'app-icon.png'), webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    mainWindow.loadFile(`index.html`);
    // mainWindow.webContents.openDevTools();
    createTopbarMenu();
}
function createTopbarMenu() {
    var template = [
        {
            label: "Action",
            submenu: [
                {
                    label: "Quit App", click: function () {
                        app.quit();
                    }
                }
            ]
        }
    ]

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
//  eslint-           
app.on("ready", createBrowserWindow);   //  es