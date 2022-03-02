import { contextBridge, ipcRenderer } from "electron";
import * as ipc from "../constants";

let appVersionInfo: string[];

process.on("loaded", () => {
  contextBridge.exposeInMainWorld("electron", {
    registerDispatch: async (dispatch: any) => {
      await ipcRenderer.invoke(ipc.DISPATCH_REGISTERED);
      appVersionInfo = await ipcRenderer.invoke(ipc.GET_APP_VERSION);
      ipcRenderer.on(ipc.DO_DISPATCH, (args: any) => {
        dispatch(args);
      });
    },
    getAppVersionInfo: () => {
      return appVersionInfo;
    }
  });
});
