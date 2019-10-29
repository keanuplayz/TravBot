const {ownerID} = require("../config.json");



module.exports.run = async (client, message, args) => {
  if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
  if(isNaN(args[0])) return message.channel.send(`A number was not provided.`)

  message.delete();
  const fetched = await message.channel.fetchMessages({limit: args[0]});
  console.log(fetched.size + ' messages found, deleting...');
  message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));
}
module.exports.config = {
    name: "clear",
    noaliases: "No aliases",
    aliases: [],
    usage: ".clear <amount>",
    description: "Clears a specified amount of messages.",
    accessibleby: "Members"
}