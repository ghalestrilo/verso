const env = process.env || {};

const config = {
  conn: {
    host: env?.VERSO_HOST_INTERNAL || "localhost",
    port: env?.VERSO_PORT_INTERNAL || 4000,
    projectFolder: env?.VERSO_TEST_FILE || "test.tidal",
  },
  init: {
    file: env?.VERSO_PROJECT_FOLDER || `${env.HOME}/.verso/projects`,
  },
};

export default config;
