const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

async function purge(message, args) {
  message.delete();

  const fetched = await message.channel.fetchMessages({limit: args[0]});
  console.log(fetched.size + ' messages found, deleting...');

  message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`Error: ${error}`));
}

module.exports.run = async (client, message, args) => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice(prefix.length).split(" ");
  if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!")

  if(isNaN(args[0])) {
    message.channel.send(`A number was not provided.`)
    return;
  }

  if (message.content.startsWith(`${prefix}clear`)) {
    purge(message, args);
  }
  


}
module.exports.config = {
    name: "clear",
    noaliases: "No aliases",
    aliases: [],
    usage: ".clear <amount>",
    description: "Clears a specified amount of messages.",
    accessibleby: "Members"
}