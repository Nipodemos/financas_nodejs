declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SURREAL_DB_HOST: string;
      SURREAL_DB_USER: string;
      SURREAL_DB_PASSWORD: string;
    }
  }
}

export {};
