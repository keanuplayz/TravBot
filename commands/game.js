const {ownerID} = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
  if (args[0]) {
    message.delete();
    client.user.setActivity(args.join(" "));
  } else {
    message.delete();
    client.user.setActivity('.help', { type: 'LISTENING' });
  } 
}

module.exports.config = {
    name: "game",
    noalias: "No aliases",
    aliases: [],
    usage: ".game",
    description: "Sets game.",
    accessibleby: "Bot Owner"
}