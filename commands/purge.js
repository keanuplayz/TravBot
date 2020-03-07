/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   // eslint-disable-line no-unused-vars
   message.delete();
   console.log("Executing purge.");
   const msgs = await message.channel.fetchMessages({
      limit: 100
   });
   const travMessages = msgs.filter(m => m.author.id === client.user.id);
   console.log(`Found ${travMessages.size} messages to delete.`);
   if (!args.includes("--silent")) {
      await message.channel.send(`Found ${travMessages.size} messages to delete.`)
         .then(m => m.delete(5000));
   }
   try {
      message.delete();
      await message.channel.bulkDelete(travMessages);
   } catch (e) {
      for (const [id, travMsg] of travMessages) {
         await travMsg.delete(1000);
      }
   }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Server Owner"
};
exports.help = {
    name: "purge",
    category: "Utility",
    description: "Purges all bot messages.",
    usage: "purge [--silent]"
};
