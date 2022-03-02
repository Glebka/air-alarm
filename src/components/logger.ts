import * as log from "electron-log";
import * as electron from "electron";
import * as electronUtil from "electron-util";

log.transports.console.format =
  "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";

log.info("App launched with args", process.argv);
log.info("App debug info", electronUtil.debugInfo().split("\n"));

log.catchErrors({
  showDialog: false,
  onError: (error, versions, submitIssue) => {
    electron.dialog
      .showMessageBox({
        title: "An error occurred",
        message: error.message,
        detail: error.stack,
        type: "error",
        buttons: ["Ignore", "Exit"]
      })
      .then(result => {
        if (result.response === 1) {
          electron.app.quit();
        }
      });
  }
});
export default log;
