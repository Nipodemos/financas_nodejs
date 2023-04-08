import * as typedDotenv from "typed-dotenv";

const { error, env } = typedDotenv.config({
  errorOnFileNotFound: true,
  template: {
    errorOnFileNotFound: true,
  },
});

if (error) {
  console.log({ error });
  throw new Error("Error loading .env file");
}

export { env };
