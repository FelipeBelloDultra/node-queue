module.exports = {
  apps: [
    {
      name: "Dev Queue",
      script: "npx tsx watch --env-file=.env ./src/infra/queue/worker.ts",
    },
    {
      name: "Dev API",
      script: "npx tsx watch --env-file=.env ./src/infra/http/server.ts",
    },
  ],
};
