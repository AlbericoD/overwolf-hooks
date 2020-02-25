const defaultCallBacks = {
  addListener(callback) {
    callback();
  },
  removeListener(callback) {
    callback();
  }
};

if (!window.overwolf) {
  window.overwolf = {
    games: {
      events: {
        onInfoUpdates2: {
          addListener(callback) {
            let timerId;
            let counter = 0;
            clearInterval(timerId);
            timerId = setTimeout(function tick() {
              counter += 1;
              callback({ info: `example [INFO] update n°: ${counter}` });
              timerId = setTimeout(tick, 6000); // (*)
            }, 6000);
          },
          removeListener(callback) {
            let timerId;
            let counter = 0;
            clearInterval(timerId);
            timerId = setTimeout(function tick() {
              counter += 1;
              callback({ info: `example [INFO] update n°: ${counter}` });
              timerId = setTimeout(tick, 6000); // (*)
            }, 6000);
          }
        },
        onNewEvents: {
          addListener(callback) {
            let timerId;
            let counter = 0;
            clearInterval(timerId);
            timerId = setTimeout(function tick() {
              counter += 1;
              callback({ events: `example [INFO] update n°: ${counter}` });
              timerId = setTimeout(tick, 3000); // (*)
            }, 3000);
          },
          removeListener(callback) {
            let timerId;
            let counter = 0;
            clearInterval(timerId);
            timerId = setTimeout(function tick() {
              counter += 1;
              callback({ events: `example [INFO] update n°: ${counter}` });
              timerId = setTimeout(tick, 3000); // (*)
            }, 3000);
          }
        },
        setRequiredFeatures: (features, callback) => {
          callback({ success: true, features });
        }
      },
      onGameInfoUpdated: defaultCallBacks,
      inputTracking: {
        onKeyDown: defaultCallBacks,
        onKeyUp: defaultCallBacks
      }
    }
  };
}
