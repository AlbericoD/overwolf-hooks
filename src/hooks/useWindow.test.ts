import '../overwolf.mock'
import { useWindow } from './useWindow'
import { renderHook } from '@testing-library/react-hooks'

describe('useWindows values', () => {
  it('should return window object', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useWindow('test-window', { displayLog: true }),
    )
    await waitForNextUpdate()
    const [owWindow] = result.current

    expect(owWindow).not.toBeUndefined()
    expect(owWindow?.id).toBe('test-window_Test_ID')
    expect(owWindow?.maximize).toBeInstanceOf(Function)
    expect(owWindow?.minimize).toBeInstanceOf(Function)
    expect(owWindow?.restore).toBeInstanceOf(Function)
    expect(owWindow?.close).toBeInstanceOf(Function)
  })
})
