import { useWindow } from "./useWindow";
import { renderHook, waitFor } from "@testing-library/react";

describe("useWindows values", () => {
  it("should return window object", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow).not.toBeUndefined();
    });
  });

  it("should return window state", async () => {
    const { result } = renderHook(() => useWindow("test-window", true, true));

    await waitFor(() => {
      const [, windowState] = result.current;
      expect(windowState).toBeUndefined();
    });
  });

  it("should return bindWindowBehavior function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [, , bindWindowBehavior] = result.current;
      expect(bindWindowBehavior).not.toBeUndefined();
    });
  });

  it("should return window object with id", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.id).not.toBeUndefined();
    });
  });

  it("should return window object with close function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.close).not.toBeUndefined();
    });
  });

  it("should return window object with minimize function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.minimize).not.toBeUndefined();
    });
  });

  it("should return window object with maximize function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;

      expect(owWindow?.maximize).not.toBeUndefined();
    });
  });

  it("should return window object with restore function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.restore).not.toBeUndefined();
    });
  });

  it("should return window object with bringToFront function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.bringToFront).not.toBeUndefined();
    });
  });

  it("should return window object with state function", async () => {
    const { result } = renderHook(() => useWindow("test-window", true));

    await waitFor(() => {
      const [owWindow] = result.current;
      expect(owWindow?.state).not.toBeUndefined();
    });
  });
});
