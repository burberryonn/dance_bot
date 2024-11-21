module.exports = {
  apps: [
    {
      name: "dance_bot",
      script: "tsx watch",
      args: "./bot.ts",
      watch: true,
    },
  ],
};
