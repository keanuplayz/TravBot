/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
   try {
      const nickName = args.join(" ");
      const trav = message.guild.members.find("id", client.user.id);
      await trav.setNickname(nickName);
      message.delete(5000);
      message.channel.send(`Nickname set to \`${nickName}\``)
         .then(m => m.delete(5000));
   } catch (e) {
      console.log(e);
   }
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [],
   permLevel: "Bot Admin"
};
exports.help = {
   name: "nick",
   category: "Utility",
   description: "Changes nickname to input.",
   usage: "nick [input]"
};
