export type ClientChildProcess = {
  name: string;
  command: string;
  params: string[];
};

export type VersoConfig = {
  conn: {
    host: string;
    port: string | number;
  };
  init: {
    file: string;
    folder: string;
  };
  processes: ClientChildProcess[];
};

// None of this is actually needed anymore, only the processes field,
// which is a user setting and should be moved there
const env = {
  VERSO_HOST_INTERNAL: null,
  VERSO_PORT_INTERNAL: null,
  VERSO_TEST_FILE: null,
  VERSO_PROJECT_FOLDER: null,
  HOME: null,
};

const config: VersoConfig = {
  conn: {
    host: env?.VERSO_HOST_INTERNAL || "localhost",
    port: env?.VERSO_PORT_INTERNAL || 4000,
  },
  init: {
    file: env?.VERSO_TEST_FILE || "include/include.tidal",
    folder: env?.VERSO_PROJECT_FOLDER || `${env.HOME || "~"}/.verso/projects`,
  },
  processes: [
    // {
    //   name: "tidal",
    //   command: "stack",
    //   params: [
    //     "exec",
    //     "ghci",
    //     "--",
    //     "-ghci-script",
    //     "/Users/admin/git/libtidal/boot.tidal",
    //   ],
    // },
    // {
    //   name: "sclang",
    //   command: "sclang",
    //   params: [],
    // },
  ],
};

export default config;
