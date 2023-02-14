function obtainWindow(name: string): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(name, (response) => {
      if (!response.success) reject(response);
      resolve(response.window);
    });
  });
}

function standardWindowBehavior(
  id: string,
  behavior: "minimize" | "maximize" | "restore" | "close"
): Promise<overwolf.windows.WindowIdResult> {
  return new Promise((resolve, reject) => {
    overwolf.windows[behavior](id, (result) => {
      if (result.success) resolve(result);
      else reject(result);
    });
  });
}

function writeLog(
  behavior: Behavior | "windowStateChanged",
  windowInfo: Partial<overwolf.windows.WindowInfo>,
  displayLog?: boolean
) {
  if (displayLog) {
    console.info(
      `[🐺 overwolf-hooks][🧰 useWindow][🔧 ${behavior}]`,
      JSON.stringify(windowInfo, null, 2)
    );
  }
}

export { standardWindowBehavior, obtainWindow, writeLog };
