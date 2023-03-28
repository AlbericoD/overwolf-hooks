const callback = (mockValue: any) => {
  callback(mockValue)
}
const commonGep = (mockValue: any) => ({
  addListener: (cb) => cb(mockValue),
  removeListener: (cb) => cb(mockValue),
})

const commonListners = {
  addListener: jest.fn(),
  removeListener: jest.fn(),
}
const games = {
  getRunningGameInfo: (
    cb: (payload: overwolf.games.GetRunningGameInfoResult) => void,
  ) =>
    cb({
      isInFocus: false,
      isRunning: true,
      allowsVideoCapture: true,
      title: 'GAME TEST',
      displayName: 'Game test',
      shortTitle: 'GT',
      id: 10000,
      classId: 10000,
      width: 1280,
      height: 768,
      logicalWidth: 1280,
      logicalHeight: 768,
      renderers: [],
      detectedRenderer: 'mock',
      executionPath: 'mock',
      sessionId: 'mock',
      commandLine: 'mock',
      type: 0,
      typeAsString: 'mock',
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
        gameInfo: { isRunning: true, id: 9999, title: 'test-game_Test_TITLE' },
        runningChanged: true,
      }),
    ),
    removeListener: jest.fn().mockImplementation((cb) =>
      cb({
        gameInfo: { isRunning: true, id: 9999, title: 'test-game_Test_TITLE' },
        runningChanged: true,
      }),
    ),
  },
  inputTracking: {
    onKeyDown: commonListners,
    onKeyUp: commonListners,
  },
  events: {
    onInfoUpdates2: commonGep({ info: 'info-test' }),
    onNewEvents: commonGep({ events: ['event-test'] }),
    setRequiredFeatures: (_, cb: (payload: { success: boolean }) => void) =>
      cb({ success: true }),
  },
}
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
      },
      success: true,
    }
    cb(result)
  },
}

export default Object.defineProperty(window, 'overwolf', {
  writable: true,
  value: { games, windows: owWindows },
})
