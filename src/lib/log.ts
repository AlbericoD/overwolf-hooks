const log = (message: string, component: string, method: string) => {
  console.info(
    `%c[🐺 overwolf-hooks][🧰 ${component}][🔧 ${method}][📃 ${message} ]`,
    "background: #0a0a0a; color: #d4d4d8; padding: 2px 0; border-radius: 2px; font-weight: bold; border: 1px solid #27272a;"
  );
};

const error = (message: string, component: string, method: string): string => {
  const errorMessage = `[🐺 overwolf-hooks][🧰 ${component}][🔧 ${method}][📃 ${message} ]`;

  return errorMessage;
};

export { log, error };
