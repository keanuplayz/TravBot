const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!")
  
  if (args[0]) {
    const game = args.join(" ");
    message.delete();
    client.user.setActivity(game);
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