/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   if (isNaN(args[0])) return message.channel.send("A number was not provided.");
   message.delete();
   const fetched = await message.channel.fetchMessages({
      limit: args[0]
   });
   console.log(fetched.size + " messages found, deleting...");
   message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error}`));
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "Bot Admin"
};
exports.help = {
   name: "clear",
   category: "Utility",
   description: "Clears a specified amount of messages.",
   usage: "clear [amount]"
};
