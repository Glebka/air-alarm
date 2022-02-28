import log from "./components/logger";
import { app, BrowserWindow } from "electron";
import serve from "electron-serve";

const loadURL = serve({ directory: "./.webpack/static" });
const logger = log.scope("main");

let mainWindow;

(async () => {
  await app.whenReady();
  mainWindow = new BrowserWindow();
  await loadURL(mainWindow);
  await mainWindow.loadURL("app://-");
  logger.info("UI loaded");
})();
