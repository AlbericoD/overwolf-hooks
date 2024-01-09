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
  behavior: Behavior
): Promise<overwolf.windows.WindowIdResult> {
  return new Promise((resolve, reject) => {
    overwolf.windows[behavior](id, (result) => {
      if (result.success) resolve(result);
      else reject(result);
    });
  });
}

export { standardWindowBehavior, obtainWindow };
