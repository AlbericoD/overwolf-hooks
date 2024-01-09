import { useCallback, useEffect, useState } from "react";
import { obtainWindow, standardWindowBehavior } from "./wrappers";
import { error, log } from "../../lib/log";

const actions: Behavior[] = [
  "minimize",
  "maximize",
  "restore",
  "close",
  "bringToFront",
];

export const useWindow = (
  name: string,
  shouldDisplayLog = false,
  listenToWindowStateChanges = false
): [
  (overwolf.windows.WindowInfo & WindowBehavior) | undefined,
  overwolf.windows.WindowStateChangedEvent | undefined,
  () => Promise<void>
] => {
  const [owWindow, setOwWindow] = useState<
    overwolf.windows.WindowInfo & WindowBehavior
  >();
  const [windowState, setWindowState] =
    useState<overwolf.windows.WindowStateChangedEvent>();

  const bindWindowBehavior = useCallback(async (): Promise<void> => {
    try {
      if (process.env.NODE_ENV === "development") {
        log(
          `[DEV MODE]`,
          "@overwolf-hooks/hooks/useWindow/wrappers.ts",
          "standardWindowBehavior"
        );
        return;
      }
      if (!name || !name.length) {
        log(
          "name is required, maybe its first render?",
          "@overwolf-hooks/hooks/useWindow.ts",
          "bindWindowBehavior"
        );
      }

      const { id, ...windowInfo } = await obtainWindow(name);
      if (!id) {
        throw new Error(`Failed to obtain window ${name}`);
      }
      const bindedWindow = standardWindowBehavior.bind(null, id);

      const updatedWindowInfo = actions.reduce((currentAction, action) => {
        currentAction[action] = async () => {
          const actionResult = await bindedWindow(action);
          if (shouldDisplayLog) {
            log(
              JSON.stringify(actionResult, null, 2),
              "@overwolf-hooks/hooks/useWindow.ts",
              `bindWindowBehavior -> ${action}`
            );
          }
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
    } catch (e) {
      const errorMessage = error(
        JSON.stringify(e, null, 2),
        "@overwolf-hooks/hooks/useWindow.ts",
        "bindWindowBehavior"
      );
      throw new Error(errorMessage);
    }
  }, [shouldDisplayLog, name]);

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
      }
      if (shouldDisplayLog) {
        log(
          JSON.stringify(windowInfo, null, 2),
          "@overwolf-hooks/hooks/useWindow.ts",
          "updateWindowStates"
        );
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
  }, [shouldDisplayLog, listenToWindowStateChanges, name]);

  return [owWindow, windowState, bindWindowBehavior];
};
