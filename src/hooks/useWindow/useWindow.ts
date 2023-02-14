import { useState, useCallback, useEffect } from "react";
import { obtainWindow, standardWindowBehavior, writeLog } from "./wrappers";

const actions: Behavior[] = ["minimize", "maximize", "restore", "close"];

export const useWindow = (name: string, { displayLog }: UseWindowArgs) => {
  const [owWindow, setOwWindow] = useState<WindowInfo>();

  const bindWindowBehavior = useCallback(async (): Promise<void> => {
    try {
      const { id, ...windowInfo } = await obtainWindow(name);
      if (!id) return;
      const bindedWindow = standardWindowBehavior.bind(null, id);

      const updatedWindowInfo: WindowInfo = {
        ...windowInfo,
        ...actions.reduce((currentAction, action) => {
          currentAction[action] = async () => {
            const actionResult = await bindedWindow(action);
            writeLog(action, windowInfo, displayLog);
            return actionResult;
          };
          return currentAction;
        }, {} as WindowInfo),
      };
      setOwWindow((prev) => ({
        ...(prev || {}),
        ...updatedWindowInfo,
        id,
      }));
    } catch (error) {
      console.log({ error });
    }
  }, [displayLog, name]);

  const updateWindowStates = useCallback(
    (windowInfo: overwolf.windows.WindowStateChangedEvent) => {
      if (windowInfo.window_name === name) {
        setOwWindow(
          (prev) =>
            prev && {
              ...prev,
              state: windowInfo.window_state,
              stateEx: windowInfo.window_state_ex,
            }
        );
        writeLog("windowStateChanged", {}, displayLog);
      }
    },
    [displayLog, name]
  );

  useEffect(() => {
    (async function bindWindowBehaviorToWindow() {
      await bindWindowBehavior();
    })();
  }, []);

  useEffect(() => {
    overwolf.windows.onStateChanged.removeListener(updateWindowStates);
    overwolf.windows.onStateChanged.addListener(updateWindowStates);

    return () => {
      overwolf.windows.onStateChanged.removeListener(updateWindowStates);
    };
  }, [updateWindowStates]);

  return [owWindow, bindWindowBehavior] as const;
};
