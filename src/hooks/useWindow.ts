import { useState, useCallback, useEffect } from "react";
interface WindowInfo {
  name: string;
  id: string;
  state: string;
  stateEx: "closed" | "minimized" | "hidden" | "normal" | "maximized";
  isVisible: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
}
const obtainWindow = (name: string): Promise<WindowInfo> =>
  new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(name, (response) => {
      if (!response.success) reject(response);
      resolve(response.window);
    });
  });
const minimize = (name: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      overwolf.windows.minimize(name, (result) => {
        if (result.success) resolve();
        else reject(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};
const close = (name: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      overwolf.windows.close(name, () => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
};
const maximize = (name: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      overwolf.windows.maximize(name, (result) => {
        if (result.success) resolve();
        else reject(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};
const restore = (name: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      overwolf.windows.restore(name, (result) => {
        if (result.success) resolve();
        else reject(result);
      });
    } catch (e) {
      reject(e);
    }
  });
};
interface OwWindow extends WindowInfo {
  id: string;
  minimize: () => void;
  maximize: () => void;
  restore: () => void;
  close: () => void;
}
export const useWindow = (
  name: string,
  { displayLog }: { displayLog?: boolean }
) => {
  const [owDeclaredWindow, setOwDeclaredWindow] = useState<WindowInfo>();
  const [owWindow, setOwWindow] = useState<OwWindow>();

  const obtainDeclaredWindow = useCallback(async () => {
    try {
      const delclaredWindow = await obtainWindow(name);
      displayLog &&
        console.info(
          "[🐺 overwolf-hooks][🧰 useWindow][🔧 obtainDeclaredWindow]",
          JSON.stringify(delclaredWindow, null, 2)
        );
      setOwDeclaredWindow(delclaredWindow);
    } catch (error) {
      console.log({ error });
    }
  }, [name]);

  useEffect(() => {
    if (owDeclaredWindow) {
      const { id, ...otherWindowProps } = owDeclaredWindow;

      const createLog = (logAction = "") =>
        displayLog &&
        console.info(
          `[🐺 overwolf-hooks][🧰 useWindow][🔧 ${logAction}]`,
          JSON.stringify(owDeclaredWindow, null, 2)
        );
      const windowActions = {
        id,
        minimize: async () => {
          await minimize(id);
          createLog("minimize");
        },
        maximize: async () => {
          await maximize(id);
          createLog("maximize");
        },
        restore: async () => {
          await restore(id);
          createLog("restore");
        },
        close: async () => {
          await close(id);
          createLog("close");
        },
      };
      setOwWindow({ ...windowActions, ...otherWindowProps });
    }
  }, [owDeclaredWindow, displayLog]);

  useEffect(() => {
    obtainDeclaredWindow();
  }, [name]);

  return [owWindow] as const;
};
