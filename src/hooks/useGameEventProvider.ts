import { useEffect, useState, useCallback } from 'react'

const Overwolf = overwolf.games.events
const REGISTER_RETRY_TIMEOUT = 10000

interface GameEventData<GameInfo, GameEvent> {
  info?: GameInfo
  events?: GameEvent[]
}

export const useGameEventProvider = <GameInfo, GameEvent>({
  displayLog,
}: {
  displayLog?: boolean
}) => {
  const [info, setInfo] = useState<GameInfo>()
  const [event, setEvent] = useState<GameEvent[]>()
  const [requiredFeatures, setFeatures] = useState<string[]>([])

  function handleGameEvent({ info, events }: GameEventData<any, any>) {
    info && setInfo(info)
    events && setEvent(events)
  }

  {
  }
  const registerToGepCallback = useCallback(
    ({ success, ...rest }: { success: boolean }) => {
      if (success) {
        Overwolf.onInfoUpdates2.removeListener(handleGameEvent)
        Overwolf.onNewEvents.removeListener(handleGameEvent)
        Overwolf.onInfoUpdates2.addListener(handleGameEvent)
        Overwolf.onNewEvents.addListener(handleGameEvent)
      } else
        setTimeout(() => {
          Overwolf.setRequiredFeatures(requiredFeatures, registerToGepCallback)
        }, REGISTER_RETRY_TIMEOUT)

      displayLog &&
        console.info(
          '[🐺 overwolf-hooks][🧰 useGameEventProvider][🔧 registerToGepCallback]',
          JSON.stringify({ success, ...rest }, null, 2),
        )
    },
    [requiredFeatures],
  )

  const runGep = useCallback(() => {
    Overwolf.setRequiredFeatures(requiredFeatures, registerToGepCallback)
  }, [requiredFeatures, registerToGepCallback])
  const setGameFeatures = useCallback(setFeatures, [])

  useEffect(() => {
    requiredFeatures.length && runGep()
    return () => {
      Overwolf.onInfoUpdates2.removeListener(handleGameEvent)
      Overwolf.onNewEvents.removeListener(handleGameEvent)
    }
  }, [runGep, requiredFeatures])

  return [{ info, event }, setGameFeatures] as const
}
