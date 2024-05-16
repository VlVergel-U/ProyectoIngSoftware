// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const { fileURLToPath } = require('url');
const dotenv = require('dotenv');
const { connectToDatabase } = require("./db.js");
const { methods: authenticationController } = require("./controllers/authentication.controller.js");

const expressApp = express();

dotenv.config();

expressApp.set("port", process.env.PORT || 4000);

expressApp.use(express.static(__dirname + "/public"));
expressApp.use(express.json());

expressApp.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "login.html"));
});

expressApp.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "admin", "admin.html"));
});

expressApp.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "register.html"));
});

expressApp.get("/Product", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Product", "addProduct.html"));
});

expressApp.get("/Inventary", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Inventary", "inventary.html"));
});

expressApp.get("/ModifyProduct", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Product", "Modify", "ModifyProduct.html"));
});

expressApp.post("/api/login", authenticationController.login);

connectToDatabase().then(() => {
    expressApp.listen(expressApp.get("port"), () => {
        console.log(`Servidor corriendo en el puerto ${expressApp.get("port")}`);
    });
});

// Create the browser window after the server has started.
const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:4000/');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
