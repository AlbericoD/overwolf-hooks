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

const Panel = () => {

const [desktopWindow] = useWindow("desktop", { displayLog: true });

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

2. **useDrag.tsx**

```TSX
import { useEffect, useCallback } from "react";
import { useDrag, useWindow } from 'overwolf-hooks'

const Header = () => {

const [desktopWindow] = useWindow("desktop", { displayLog: true });
const { onDragStart, onMouseMove, setCurrentWindowID } = useDrag(null, { displayLog: true });

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

const Overlay = () => {

const [{ event, info }, setGameFeatures] = useGameEventProvider<
    GameExample.Info, //change with your GAME INTERFACE <OPTIONAL>
    GameExample.Event //change with your GAME INTERFACE <OPTIONAL>
  >({ displayLog: true });

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

const Alert = () => {

  const [currentGame] = useRunningGame({ displayLog: true });

  useEffect(() => {
    console.info("currentGame", currentGame);
  }, [currentGame]);

return <p>Alert Window</p>

}
```

## License

MIT © [AlbericoD](https://github.com/AlbericoD)
