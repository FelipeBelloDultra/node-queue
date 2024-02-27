module.exports = {
  apps: [
    {
      name: "Queue",
      script: "node ./dist/infra/http/worker.js",
    },
    {
      name: "API",
      script: "node ./dist/infra/http/server.js",
    },
  ],
};
