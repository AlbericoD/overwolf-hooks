type Behavior =
  | "minimize"
  | "maximize"
  | "restore"
  | "close"
  | "bringToFront"
  | "hide";
type UseWindowArgs = {
  displayLog?: boolean;
  listenToWindowStateChanges?: boolean;
};

type WindowBehavior = Record<
  Behavior,
  () => Promise<overwolf.windows.WindowIdResult>
>;

type WindowInfo = overwolf.windows.WindowInfo & WindowBehavior;
