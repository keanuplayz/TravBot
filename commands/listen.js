const {ownerID} = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
  if (args[0]) {
    message.delete();
    client.user.setActivity(args.join(" "), { type: 'LISTENING' });
  } else {
    message.delete();
    client.user.setActivity('.help', { type: 'LISTENING' });
  } 
}

module.exports.config = {
    name: "listen",
    noalias: "No aliases",
    aliases: [],
    usage: ".listen",
    description: "Sets listening status.",
    accessibleby: "Bot Owner"
}
