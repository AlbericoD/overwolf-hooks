import '../overwolf.mock'
import { useRunningGame } from './useRunningGame'
import { renderHook } from '@testing-library/react-hooks'

describe('useRunningGame values', () => {
  it('should return runningGame object', () => {
    const { result } = renderHook(() => useRunningGame())

    const [game] = result.current
    expect(game).not.toBeUndefined()
    expect(game).not.toBeNull()
    expect(game?.id).toBe(1000)
    expect(game?.title).toBe('GAME TEST')
    expect(game?.gameRunning).toBe(true)
  })
})
