import '../overwolf.mock'
import { useDrag } from './useDrag'
import { renderHook } from '@testing-library/react-hooks'

describe('useDrag values', () => {
  it('should return useDrag functions', () => {
    const { result } = renderHook(() =>
      useDrag('test-element', { displayLog: true }),
    )
    const {
      onDragStart,
      onMouseMove,
      setCurrentWindowID,
      ...props
    } = result.current
    expect(props).not.toBeUndefined()
    expect(onDragStart).toBeInstanceOf(Function)
    expect(onMouseMove).toBeInstanceOf(Function)
    expect(setCurrentWindowID).toBeInstanceOf(Function)
  })
})
