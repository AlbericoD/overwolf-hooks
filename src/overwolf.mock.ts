const callback = (mockValue: any) => {
  callback(mockValue);
};
const commonGep = (mockValue: any) => ({
  addListener: jest.fn().mockImplementation(cb => cb(mockValue)),
  removeListener: jest.fn().mockImplementation(cb => cb(mockValue))
});

const commonListners = {
  addListener: jest.fn(),
  removeListener: jest.fn()
};
const games = {
  onGameInfoUpdated: {
    addListener: jest.fn().mockImplementation(cb =>
      cb({
        gameInfo: { isRunning: true, id: 9999, title: "test-game_Test_TITLE" },
        runningChanged: true
      })
    ),
    removeListener: jest.fn().mockImplementation(cb =>
      cb({
        gameInfo: { isRunning: true, id: 9999, title: "test-game_Test_TITLE" },
        runningChanged: true
      })
    )
  },
  inputTracking: {
    onKeyDown: commonListners,
    onKeyUp: commonListners
  },
  events: {
    onInfoUpdates2: commonGep({ info: "info-test" }),
    onNewEvents: commonGep({ events: ["event-test"] }),
    setRequiredFeatures: jest.fn().mockResolvedValue({ success: true })
  }
};
const owWindows = {
  getCurrentWindow: jest.fn(),
  getMainWindow: () => ({
    window: {}
  }),
  obtainDeclaredWindow: (windowName: string, cb: any) => {
    const result = {
      window: {
        name: `${windowName}_Test_Name`,
        id: `${windowName}_Test_ID`
      },
      success: true
    };
    cb(result);
  }
};

export default Object.defineProperty(window, "overwolf", {
  writable: true,
  value: { games, windows: owWindows }
});
