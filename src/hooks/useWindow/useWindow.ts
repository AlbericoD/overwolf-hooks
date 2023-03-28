import { useCallback, useEffect, useMemo, useState } from "react";
import { obtainWindow, standardWindowBehavior, writeLog } from "./wrappers";

const actions: Behavior[] = [
  "minimize",
  "maximize",
  "restore",
  "close",
  "bringToFront",
];

export const useWindow = (
  name: string,
  { displayLog, listenToWindowStateChanges }: UseWindowArgs
): [
  WindowInfo | undefined,
  overwolf.windows.WindowStateChangedEvent | undefined,
  () => Promise<void>
] => {
  const [owWindow, setOwWindow] = useState<WindowInfo>();
  const [windowState, setWindowState] =
    useState<overwolf.windows.WindowStateChangedEvent>();

  const bindWindowBehavior = useCallback(async (): Promise<void> => {
    try {
      const { id, ...windowInfo } = await obtainWindow(name);
      if (!id) {
        throw new Error(`Failed to obtain window ${name}`);
      }
      const bindedWindow = standardWindowBehavior.bind(null, id);

      const updatedWindowInfo = actions.reduce((currentAction, action) => {
        currentAction[action] = async () => {
          const actionResult = await bindedWindow(action);
          writeLog(action, windowInfo, displayLog);
          return actionResult;
        };
        return currentAction;
      }, {} as WindowBehavior);

      setOwWindow((prev) => ({
        ...(prev || {}),
        ...windowInfo,
        ...updatedWindowInfo,
        id,
      }));
    } catch (error) {
      throw new Error(
        `[🐺 overwolf-hooks][🧰 useWindow][🔧 bindWindowBehavior] ${JSON.stringify(
          error,
          null,
          2
        )}}`
      );
    }
  }, [displayLog, name]);

  useEffect(() => {
    const bindWindow = async () => {
      await bindWindowBehavior();
    };
    bindWindow();
  }, [bindWindowBehavior]);

  useEffect(() => {
    const updateWindowStates = (
      windowInfo: overwolf.windows.WindowStateChangedEvent
    ) => {
      if (windowInfo.window_name === name) {
        setWindowState(windowInfo);
        writeLog("windowStateChanged", windowInfo, displayLog);
      }
    };

    if (listenToWindowStateChanges) {
      overwolf.windows.onStateChanged.removeListener(updateWindowStates);
      overwolf.windows.onStateChanged.addListener(updateWindowStates);
    }

    return () => {
      if (listenToWindowStateChanges)
        overwolf.windows.onStateChanged.removeListener(updateWindowStates);
    };
  }, [displayLog, listenToWindowStateChanges, name]);

  return [owWindow, windowState, bindWindowBehavior];
};
