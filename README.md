<h1 align="center">
  Overwolf Hooks
</h1>
<p align="center">
Custom hooks to help use overwolf api with the new react hooks technology.
</p>

[![NPM](https://img.shields.io/npm/v/overwolf-hooks.svg)](https://www.npmjs.com/package/overwolf-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save overwolf-hooks
pnpm install --save overwolf-hooks
yarn add overwolf-hooks
```

````

## How to use

- If you are not familiar with Overwolf [overwolf api](https://overwolf.github.io/)
- If you are not familiar with React hooks, take a look at [the documentation](https://reactjs.org/docs/hooks-intro.html)

### Hooks

1. **useWindow.tsx**

```TSX
import { useWindow } from 'overwolf-hooks';

const shouldDisplayLog = true;
const shouldListenToWindowStateChanges = true;

const Panel = () => {

const [desktopWindow] = useWindow("desktop", shouldDisplayLog,shouldListenToWindowStateChanges);

return (
    <div>
      <h1>Desktop Window</h1>
      <button onClick={()=> desktopWindow?.minimize()}>Minimize</button>
      <button onClick={()=> desktopWindow?.restore()}>Restore</button>
      <button onClick={()=> desktopWindow?.maximize()}>Maximize</button>
      <button onClick={()=> desktopWindow?.close()}>Close</button>
    </div>
  )
}


## Force Window update

If you need to force update the window state, you can use the refreshState function.

```tsx
import { useWindow } from 'overwolf-hooks'

const shouldDisplayLog = true;
const shouldListenToWindowStateChanges = true;

const Panel = () => {

//listenToWindowStateChanges is set to true to listen to window state changes, so you can read the window state from the desktopWindowStateChanged variable
const [desktopWindow, desktopWindowStateChanged, refreshState] = useWindow("desktop", shouldDisplayLog, shouldListenToWindowStateChanges);

useEffect(() => {
  //........ any other code
  //force update/rebind the window object
  refreshState();
}, [refreshState]);

useEffect(() => {
  //........ any other code
  console.info("desktopWindowStateChanged", desktopWindowStateChanged);
}, [desktopWindowStateChanged]);

return <CustomComponent {...desktopWindow}/>
}

```

2. **useDrag.tsx**

```TSX
import { useEffect, useCallback } from "react";
import { useDrag, useWindow } from 'overwolf-hooks'

const shouldDisplayLog = true;

const Header = () => {

const [desktopWindow] = useWindow("desktop", shouldDisplayLog);
const { onDragStart, onMouseMove, setCurrentWindowID } = useDrag(null, shouldDisplayLog);

const updateDragWindow = useCallback(() => {
  if (desktopWindow?.id) setCurrentWindowID(desktopWindow.id);
}, [desktopWindow, setCurrentWindowID]);

useEffect(updateDragWindow, [updateDragWindow])

return (
    <header
      onMouseDown={event => onDragStart(event)}
      onMouseMove={event => onMouseMove(event)}>
        Header Text
    </header>
  )
}
```

3. **useGameEventProvider.tsx**

```TSX
const REQUIRED_FEATURES = ["game_info", "match_info", "game_events"];
const RETRY_TIMES = 5;
const DISPLAY_OVERWOLF_HOOKS_LOGS = true;

const BackgroundWindow = () => {
  const { started, start, stop } = useGameEventProvider(
    {
      onInfoUpdates: (info) => { console.log("info", info); },
      onNewEvents: (events) =>  { console.log("events", events); }),
    },
    REQUIRED_FEATURES,
    RETRY_TIMES,
    DISPLAY_OVERWOLF_HOOKS_LOGS
  );

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

}
```

4. **useRunningGame.tsx**

```TSX
import { useEffect } from "react";
import { useGameEventProvider, useRunningGame } from 'overwolf-hooks'

const shouldDisplayLog = true;

const Alert = () => {

  const [currentGame] = useRunningGame(shouldDisplayLog);

  useEffect(() => {
    console.info("currentGame", currentGame);
  }, [currentGame]);

return <p>Alert Window</p>

}
```

## License

MIT © [AlbericoD](https://github.com/AlbericoD)

````
