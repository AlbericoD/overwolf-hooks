# overwolf-hooks

> wrapper common overwolf methods

[![NPM](https://img.shields.io/npm/v/overwolf-hooks.svg)](https://www.npmjs.com/package/overwolf-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save overwolf-hooks
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'overwolf-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [AlbericoD](https://github.com/AlbericoD)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
