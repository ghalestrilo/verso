export type VersoConfig = {
  conn: {
    host: string;
    port: string | number;
  };
  init: {
    file: string;
    folder: string;
  };
};

const env = process.env || {};

const config: VersoConfig = {
  conn: {
    host: env?.VERSO_HOST_INTERNAL || "localhost",
    port: env?.VERSO_PORT_INTERNAL || 4000,
  },
  init: {
    file: env?.VERSO_TEST_FILE || "test.tidal",
    folder: env?.VERSO_PROJECT_FOLDER || `${env.HOME || "~"}/.verso/projects`,
  },
};

export default config;
