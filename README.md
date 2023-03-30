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
```

## How to use

- If you are not familiar with Overwolf [overwolf api](https://overwolf.github.io/)
- If you are not familiar with React hooks, take a look at [the documentation](https://reactjs.org/docs/hooks-intro.html)

### Hooks

1. **useWindow.tsx**

```TSX
import { useWindow } from 'overwolf-hooks'

const options =  { displayLog: true }

const Panel = () => {

const [desktopWindow] = useWindow("desktop", options);

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
```

## Force Window update

If you need to force update the window state, you can use the refreshState function.


```TSX
import { useWindow } from 'overwolf-hooks'

const options =  { displayLog: true, listenToWindowStateChanges: true }

const Panel = () => {

//listenToWindowStateChanges is set to true to listen to window state changes, so you can read the window state from the desktopWindowStateChanged variable
const [desktopWindow, desktopWindowStateChanged, refreshState] = useWindow("desktop", options);

useEffect(() => {
  //........ any other code
  //force update
  refreshState();
}, [refreshState]);

return <CustomComponent {...desktopWindow}/>
}
```


2. **useDrag.tsx**

```TSX
import { useEffect, useCallback } from "react";
import { useDrag, useWindow } from 'overwolf-hooks'

const options =  { displayLog: true }

const Header = () => {

const [desktopWindow] = useWindow("desktop", options);
const { onDragStart, onMouseMove, setCurrentWindowID } = useDrag(null, options);

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
import { useEffect } from "react";
import { useGameEventProvider } from 'overwolf-hooks'

const options =  { displayLog: true }

const Overlay = () => {

const [{ event, info }, setGameFeatures] = useGameEventProvider<
    GameExample.Info, //change with your GAME INTERFACE <OPTIONAL>
    GameExample.Event //change with your GAME INTERFACE <OPTIONAL>
  >(options);

  useEffect(() => {
    console.info("event", event); // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [event]);

  useEffect(() => {
    console.info("info", info); // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [info]);

return <p>Overlay Window</p>

}
```

4. **useRunningGame.tsx**

```TSX
import { useEffect } from "react";
import { useGameEventProvider, useRunningGame } from 'overwolf-hooks'

const options =  { displayLog: true }

const Alert = () => {

  const [currentGame] = useRunningGame(options);

  useEffect(() => {
    console.info("currentGame", currentGame);
  }, [currentGame]);

return <p>Alert Window</p>

}
```

## License

MIT © [AlbericoD](https://github.com/AlbericoD)
