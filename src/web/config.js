export const VERSO_HOST_INTERNAL = process.env?.VERSO_HOST_INTERNAL || "localhost";
export const VERSO_PORT_INTERNAL = process.env?.VERSO_PORT_INTERNAL || 4000;
export const VERSO_TEST_FILE = process.env?.VERSO_TEST_FILE || "test.tidal";
export const VERSO_PROJECT_FOLDER =
  process.env?.VERSO_PROJECT_FOLDER || `${process.env.HOME}/.verso/projects`;
