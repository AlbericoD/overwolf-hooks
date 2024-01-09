/**
 * Pauses the execution for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @example await sleep(1000);
 * @returns A promise that resolves after the specified delay.
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Creates a throttled version of the provided function that limits the rate at which it can be called.
 * @param func The function to throttle.
 * @param delay The minimum delay (in milliseconds) between function invocations.
 * @example const throttled = throttle(() => console.log('Hello World!'), 1000);
 * @returns A throttled version of the function.
 */
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    }
  };
}

export { throttle, sleep };
