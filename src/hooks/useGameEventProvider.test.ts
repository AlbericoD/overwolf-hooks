import '../overwolf.mock'
import { useGameEventProvider } from './useGameEventProvider'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useGameEventProvider values', () => {
  it('should return undefined when there are no required features', () => {
    const { result } = renderHook(() =>
      useGameEventProvider({ displayLog: true }),
    )
    const [{ event, info }] = result.current
    expect(event).toBeUndefined()
    expect(info).toBeUndefined()
  })
  it('should return gameEvent value in first update after set required features', () => {
    const { result } = renderHook(() =>
      useGameEventProvider<{ info: string }, { event: string }>({
        displayLog: true,
      }),
    )
    const [initialGameData, setRequiredFeatures] = result.current
    act(() => {
      setRequiredFeatures(['kill', 'match'])
    })

    const [gameData] = result.current

    expect(initialGameData).toEqual({ event: undefined, info: undefined })
    expect(gameData).toEqual({ event: ['event-test'], info: 'info-test' })
  })
})
