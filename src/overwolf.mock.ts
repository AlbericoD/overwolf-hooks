const callback = (mockValue: any) => {
  callback(mockValue);
};
const commonGep = (mockValue: any) => ({
  addListener: (cb: any) => cb(mockValue),
  removeListener: (cb: any) => cb(mockValue),
});

const commonListners = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
};
const games = {
  getRunningGameInfo: (
    cb: (payload: overwolf.games.GetRunningGameInfoResult) => void
  ) =>
    //@ts-ignore
    cb({
      isInFocus: false,
      isRunning: true,
      allowsVideoCapture: true,
      title: "GAME TEST",
      displayName: "Game test",
      shortTitle: "GT",
      id: 10000,
      classId: 10000,
      width: 1280,
      height: 768,
      logicalWidth: 1280,
      logicalHeight: 768,
      renderers: [],
      detectedRenderer: "mock",
      executionPath: "mock",
      sessionId: "mock",
      commandLine: "mock",
      type: 0,
      typeAsString: "mock",
      windowHandle: { value: 11 },
      monitorHandle: { value: 12 },
      processId: 5,
      overlayInfo: {
        inputFailure: false,
        hadInGameRender: false,
        isCursorVisible: false,
        exclusiveModeDisabled: false,
        oopOverlay: false,
      },
      success: true,
    }),
  onGameInfoUpdated: {
    addListener: jest.fn().mockImplementation((cb) =>
      cb({
        gameInfo: { isRunning: true, id: 9999, title: "test-game_Test_TITLE" },
        runningChanged: true,
      })
    ),
    removeListener: jest.fn().mockImplementation((cb) =>
      cb({
        gameInfo: { isRunning: true, id: 9999, title: "test-game_Test_TITLE" },
        runningChanged: true,
      })
    ),
  },
  inputTracking: {
    onKeyDown: commonListners,
    onKeyUp: commonListners,
  },
  events: {
    onInfoUpdates2: commonGep({ info: "info-test" }),
    onNewEvents: commonGep({ events: ["event-test"] }),
    setRequiredFeatures: (
      _: any,
      cb: (payload: { success: boolean }) => void
    ) => cb({ success: true }),
  },
};
const owWindows = {
  getCurrentWindow: jest.fn(),
  getMainWindow: () => ({
    window: {},
  }),
  obtainDeclaredWindow: (windowName: string, cb: any) => {
    const result = {
      window: {
        name: `${windowName}_Test_Name`,
        id: `${windowName}_Test_ID`,
        state: "normal",
        stateEx: "normal",
      },
      success: true,
    };
    cb(result);
  },
  onStateChanged: {
    addListener: (cb: any) => {
      cb({
        window: { id: "test-window_Test_ID" },
        window_state: "minimized",
        window_state_ex: "normal",
      });
    },
    removeListener: jest.fn().mockImplementation((cb) =>
      cb({
        window: { id: "test-window_Test_ID" },
        window_state: "minimized",
        window_state_ex: "normal",
      })
    ),
  },
};

export default Object.defineProperty(window, "overwolf", {
  writable: true,
  value: { games, windows: owWindows },
});
