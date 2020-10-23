const {app, BrowserWindow} = require("electron")
const isDev = require("electron-is-dev")
const path = require("path")
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

let mainWindow;

function createMainWindow() {
	const window = new BrowserWindow({
		webPreferences: {
			worldSafeExecuteJavaScript: true,
			contextIsolation: true
			// preload: path.join(app.getAppPath(), `${isDev ? "public" : "build"}/preload.js`)
		},
		backgroundColor: "#1b1b1b",
		autoHideMenuBar: true,
		show: false,
	});

	window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

	window.on("closed", () => {
		mainWindow = null;
	});

	window.show();
	if (isDev) window.webContents.openDevTools()
	return window;
}

app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (mainWindow === null) mainWindow = createMainWindow();
});

app.on("ready", () => {
	mainWindow = createMainWindow();
});

app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS);
});
