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

1. **useWindow.ts**

```TSX
import React from "react";
import { useWindow } from 'overwolf-hooks'

const Panel:FC = ()=>{
const [desktopWindow] = useWindow("desktop");

return <>
          <p>Desktop Window</p>
          <button onClick={()=> desktopWindow?.minimize()}>Minimize</button>
          <button onClick={()=> desktopWindow?.restore()}>Restore</button>
          <button onClick={()=> desktopWindow?.maximize()}>Maximize</button>
          <button onClick={()=> desktopWindow?.close()}>Close</button>
        </>
}
```

2. **useDrag.ts**

```TSX
import React,{ useCallback } from "react";
import { useDrag, useWindow } from 'overwolf-hooks'

const Header:FC = ()=>{
const [desktopWindow] = useWindow("desktop");
const { onDragStart, onMouseMove, setCurrentWindowID } = useDrag(null);

const updateDragWindow = useCallback(() => {
  if (desktopWindow?.id) setCurrentWindowID(desktopWindow.id);
}, [desktopWindow]);

return <header onMouseDown={event => onDragStart(event)} onMouseMove={event => onMouseMove(event)}>
          Header Text
        </header>
}
```

3. **useGameEventProvider.ts**

```TSX
import React,{ useEffect } from "react";
import { useGameEventProvider } from 'overwolf-hooks'

const Overlay:FC = ()=>{
const [{ event, info }, setGameFeatures] = useGameEventProvider<
    GameExample.Info,
    GameExample.Event
  >();

  useEffect(() => {
    console.info("event", event); // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [event]);

  useEffect(() => {
    console.info("info", info); // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [info]);

return <p>Overlay Window</p>

}
```

4. **useRunningGame.ts**

```TSX
import React,{ useEffect } from "react";
import { useGameEventProvider } from 'overwolf-hooks'

const Alert:FC = ()=>{
  const [currentGame] = useRunningGame();

  useEffect(() => {
    console.info("currentGame", currentGame);
  }, [currentGame]);

return <p>Alert Window</p>

}
```

## License

MIT © [AlbericoD](https://github.com/AlbericoD)
