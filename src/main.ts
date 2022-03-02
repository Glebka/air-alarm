import log from "./components/logger";
import { app, BrowserWindow } from "electron";
import *  as path from "path";
import serve from "electron-serve";
import * as electronUtil from "electron-util";

import IPC from "./components/ipc";

const loadURL = serve({ directory: "./.webpack/static" });
const logger = log.scope("main");

let mainWindow;

(async () => {
  await app.whenReady();
  const ipc = IPC.getInstance();

  ipc.handleGetAppVersion(() => {
    return electronUtil.debugInfo().split('\n');
  });

  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "..", ".webpack/preload.js")
    }
  });
  await loadURL(mainWindow);
  await mainWindow.loadURL("app://-/index.html");
  logger.info("UI loaded");
})();
