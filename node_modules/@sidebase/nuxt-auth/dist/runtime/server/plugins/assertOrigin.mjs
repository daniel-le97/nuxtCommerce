import { getServerOrigin, ERROR_MESSAGES } from "../services/nuxtAuthHandler.mjs";
import { defineNitroPlugin } from "#imports";
export default defineNitroPlugin(() => {
  try {
    getServerOrigin();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.info(ERROR_MESSAGES.NO_ORIGIN);
    } else {
      throw error;
    }
  }
});
