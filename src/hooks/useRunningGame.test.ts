import '../overwolf.mock'
import { useRunningGame } from './useRunningGame'
import { renderHook } from '@testing-library/react-hooks'

describe('useRunningGame values', () => {
  it('should return runningGame object', () => {
    const { result } = renderHook(() => useRunningGame({ displayLog: true }))

    const [game] = result.current
    expect(game).not.toBeUndefined()
    expect(game).not.toBeNull()
    expect(game?.id).toBe(1000)
    expect(game?.title).toBe('test-game_Test_TITLE')
    expect(game?.gameRunning).toBe(true)
  })
})
