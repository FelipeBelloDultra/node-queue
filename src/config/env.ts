export const env = {
  api: {
    port: Number(process.env.API_PORT) || 3333,
  },
  mail: {
    host: process.env.MAIL_HOST || "",
    port: Number(process.env.MAIL_PORT) || 0,
    username: process.env.MAIL_USERNAME || "",
    password: process.env.MAIL_PASSWORD || "",
    fromAddress: process.env.MAIL_FROM_ADDRESS || "",
    fromName: process.env.MAIL_FROM_NAME || "",
  },
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
};
