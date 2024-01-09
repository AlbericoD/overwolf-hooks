import { useGameEventProvider } from "./useGameEventProvider";
import { renderHook } from "@testing-library/react";

describe("useGameEventProvider values", () => {
  it("should return false when there are no required features", () => {
    const { result } = renderHook(() =>
      useGameEventProvider(
        { onInfoUpdates: () => {}, onNewEvents: () => {} },
        []
      )
    );
    const { started } = result.current;
    expect(started).toBeFalsy();
  });
});
