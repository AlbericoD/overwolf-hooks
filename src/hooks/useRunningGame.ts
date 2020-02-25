import { useState, useEffect, useCallback } from "react";
export interface UseRunningGamePayload {
  gameRunning: boolean;
  id: number;
  title: string;
}
export const useRunningGame = () => {
  const [game, setGame] = useState<UseRunningGamePayload>();

  function onGameInfoUpdated(payload: overwolf.games.GameInfoUpdatedEvent) {
    const gameRunning: UseRunningGamePayload = {
      gameRunning: payload.gameInfo?.isRunning || false,
      id: Math.round((payload.gameInfo?.id || 0) / 10),
      title: payload.gameInfo?.title || ""
    };
    const gameStateChanged = payload?.runningChanged || payload?.gameChanged;

    if (gameStateChanged) setGame(gameRunning);
  }

  const addListener = useCallback(async () => {
    overwolf.games.onGameInfoUpdated.removeListener(payload =>
      onGameInfoUpdated(payload)
    );
    overwolf.games.onGameInfoUpdated.addListener(payload =>
      onGameInfoUpdated(payload)
    );
  }, []);

  useEffect(() => {
    addListener();
  }, [addListener]);

  return [game] as const;
};
