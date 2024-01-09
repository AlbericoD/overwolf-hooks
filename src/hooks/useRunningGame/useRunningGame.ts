import { useEffect, useState } from "react";
import { log } from "../../lib/log";

export interface UseRunningGamePayload {
  gameRunning: boolean;
  id: number;
  title: string;
  gameChanged: boolean;
  isInFocus: boolean;
}

export const useRunningGame = (shouldDisplayLog = false) => {
  const [game, setGame] = useState<UseRunningGamePayload | null>(null);

  function onGameInfoUpdated(payload: overwolf.games.GameInfoUpdatedEvent) {
    const gameRunning: UseRunningGamePayload = {
      gameRunning: payload?.gameInfo?.isRunning ?? false,
      id: Math.round((payload?.gameInfo?.id || 0) / 10),
      title: payload?.gameInfo?.title || "",
      gameChanged: payload?.gameChanged || false,
      isInFocus: payload?.focusChanged || false,
    };
    setGame(gameRunning);
    if (shouldDisplayLog) {
      log(
        JSON.stringify(gameRunning, null, 2),
        "@overwolf-hooks/hooks/useRunningGame.ts",
        "onGameInfoUpdated"
      );
    }
  }

  function onGetRunningGameInfo(
    payload: overwolf.games.GetRunningGameInfoResult
  ): void {
    if (shouldDisplayLog) {
      log(
        JSON.stringify(payload, null, 2),
        "@overwolf-hooks/hooks/useRunningGame.ts",
        "onGetRunningGameInfo"
      );
    }
    setGame((currentGame) => ({
      gameChanged: currentGame?.gameChanged || false,
      id: Math.round((payload?.id || 0) / 10),
      title: payload?.title || "",
      gameRunning: payload?.isRunning ?? false,
      isInFocus: payload?.isInFocus ?? false,
    }));
  }

  useEffect(() => {
    overwolf.games.getRunningGameInfo(onGetRunningGameInfo);

    overwolf.games.onGameInfoUpdated.removeListener(onGameInfoUpdated);
    overwolf.games.onGameInfoUpdated.addListener(onGameInfoUpdated);

    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(onGameInfoUpdated);
    };
  }, []);

  return game;
};
