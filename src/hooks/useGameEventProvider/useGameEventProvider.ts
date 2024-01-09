import { useCallback, useState } from "react";
import { sleep } from "../../lib/utils";
import { log } from "../../lib/log";

interface UseGameEventProviderEventsDelegate {
  onInfoUpdates(
    info:
      | overwolf.games.events.InfoUpdates2Event
      | overwolf.games.InstalledGameInfo
  ): void;
  onNewEvents(events: overwolf.games.events.NewGameEvents): void;
}
const getInfo = (): Promise<overwolf.games.GetGameInfoResult> => {
  return new Promise((resolve) => {
    overwolf.games.events.getInfo((info) => resolve(info));
  });
};
export function useGameEventProvider(
  delegate: UseGameEventProviderEventsDelegate,
  requiredFeatures: Array<string>,
  featureRetries = 10,
  displayLog = false
) {
  const [started, setStarted] = useState(false);

  const onInfoUpdates = useCallback(
    (
      info: UseGameEventProviderEventsDelegate["onInfoUpdates"]["arguments"]
    ): void => {
      delegate.onInfoUpdates(info);
      if (displayLog) {
        log(
          JSON.stringify(info, null, 2),
          "useGameEventProvider.ts",
          "onInfoUpdates() -> delegate"
        );
      }
    },
    [delegate, displayLog]
  );

  const onNewEvents = useCallback(
    (
      events: UseGameEventProviderEventsDelegate["onNewEvents"]["arguments"]
    ): void => {
      delegate.onNewEvents(events);
      if (displayLog) {
        log(
          JSON.stringify(events, null, 2),
          "useGameEventProvider.ts",
          "onNewEvents() -> delegate"
        );
      }
    },
    [delegate, displayLog]
  );

  const unRegisterEvents = (): void => {
    overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates);
    overwolf.games.events.onNewEvents.removeListener(onNewEvents);
  };
  const registerEvents = (): void => {
    unRegisterEvents();
    overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates);
    overwolf.games.events.onNewEvents.addListener(onNewEvents);
  };

  const setRequiredFeatures = useCallback(async () => {
    if (!requiredFeatures.length) return setStarted(false);
    let tries: number = 1;
    let result: overwolf.games.events.SetRequiredFeaturesResult = {
      success: false,
    };

    while (tries <= featureRetries) {
      log(
        `try ${tries} of ${featureRetries}`,
        "useGameEventProvider.ts",
        "setRequiredFeatures() -> callback -> try"
      );
      result = await new Promise((resolve) => {
        overwolf.games.events.setRequiredFeatures(
          requiredFeatures,
          (requiredResult) => resolve(requiredResult)
        );
      });

      if (result.success) {
        log(
          JSON.stringify(result, null, 2),
          "useGameEventProvider.ts",
          "setRequiredFeatures() -> callback -> success"
        );
        const isSupported =
          Array.isArray(result.supportedFeatures) &&
          result.supportedFeatures.length > 0;

        setStarted(isSupported);
        return void 0;
      }

      await sleep(3000);
      tries++;
    }
    log(
      JSON.stringify(result, null, 2),
      "useGameEventProvider.ts",
      "setRequiredFeatures() -> callback -> failure"
    );

    setStarted(false);
    return void 0;
  }, [requiredFeatures]);

  const start = useCallback(async (): Promise<void> => {
    if (started) return;

    registerEvents();

    await setRequiredFeatures();

    const { gameInfo, success } = await getInfo();

    if (gameInfo && success) {
      onInfoUpdates(gameInfo);
    }
  }, [setRequiredFeatures, onInfoUpdates, started, registerEvents]);

  const stop = useCallback((): void => {
    setStarted(false);
    unRegisterEvents();
  }, [unRegisterEvents]);

  // useEffect(() => {
  //   start();

  //   return () => {
  //     stop();
  //   };
  // }, [start, stop]);

  return { started, start, stop } as const;
}
