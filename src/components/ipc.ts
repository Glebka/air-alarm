import { ipcMain, webContents } from "electron";
import * as electronUtil from "electron-util";

import log from "./logger";
import * as ipc from "../constants";

const logger = log.scope("ipc");

class IPC {
  private _dispatchRegisteredHandler: any = null;
  private _getAppVersionInfoHandler: any = null;
  private static _instance: IPC;

  constructor() {
    logger.info("Registering default IPC handlers");
    ipcMain.handle(ipc.DISPATCH_REGISTERED, async () => {
      return await this._onDispatchRegistered();
    });
    ipcMain.handle(ipc.GET_APP_VERSION, async () => {
      return await this._onGetAppVersionInfo();
    });
  }

  static getInstance() {
    if (!IPC._instance) {
      IPC._instance = new IPC();
    }
    return IPC._instance;
  }

  handleDispatchRegistered(cb: any) {
    this._dispatchRegisteredHandler = cb;
  }

  handleGetAppVersion(cb: any) {
    this._getAppVersionInfoHandler = cb;
  }

  dispatch(action: {type: string, payload?: any}) {
    webContents.getAllWebContents().map((renderer) => {
      renderer.send(ipc.DO_DISPATCH,  action);
    });
  }

  private async _onDispatchRegistered() {
    logger.info("Redux dispatch() function has been registered");
    if (this._dispatchRegisteredHandler) {
      return this._dispatchRegisteredHandler();
    } else {
      logger.warn("No handler for DispatchRegistered IPC call");
    }
  }

  private async _onGetAppVersionInfo() {
    logger.info("GetAppVersionInfo request received");
    if (this._getAppVersionInfoHandler) {
      return this._getAppVersionInfoHandler();
    } else {
      logger.warn("No handler for GetAppVersionInfo IPC call");
    }
  }
}

export default IPC;
