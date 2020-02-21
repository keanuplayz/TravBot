module.exports = async client => {
    client.logger.log("The bot is reconnecting!", "error");
    client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "LISTENING"});
  };
  