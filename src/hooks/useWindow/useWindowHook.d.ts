type Behavior = "minimize" | "maximize" | "restore" | "close";
type UseWindowArgs = {
  displayLog?: boolean;
};
type WindowInfo = overwolf.windows.WindowInfo & {
  [key in Behavior]: () => Promise<overwolf.windows.WindowIdResult>;
};
