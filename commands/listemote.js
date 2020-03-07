const Discord = require("discord.js");
const {
   nsfw
} = require("../config.js");
exports.run = async (client, message) => {
   const list = client.emojis.filter(x => !nsfw.includes(x.guild.id), this)
      .array();
   let page = 1;
   const epg = 20;
   let content = "";
   const left = "⬅",
      right = "➡";
   var embed = new Discord.RichEmbed()
      .setTitle("**Emoji list!**")
      .setColor(message.guild.me.displayHexColor);
   let owo = list.slice((page - 1) * epg, page * epg);
   owo.forEach(q => (content += q.toString() + " | " + q.name + "\n"));
   embed.setDescription(content);
   const msg = await message.channel.send({
      embed
   });
   if (list.length < epg) return;
   await msg.react("⬅");
   await msg.react("➡");
   const backwardsfilter = (reaction, user) => reaction.emoji.name == left && user.id == message.author.id;
   const forwardsfilter = (reaction, user) => reaction.emoji.name == right && user.id == message.author.id;
   const backwards = msg.createReactionCollector(backwardsfilter, {
      time: 300000
   });
   const forwards = msg.createReactionCollector(forwardsfilter, {
      time: 300000
   });
   backwards.on("collect", () => {
      if (page < 2) return;
      msg.reactions.find(uwu => (uwu.emoji.name = "⬅"))
         .remove(message.author);
      page--;
      owo = list.slice((page - 1) * epg, page * epg);
      content = "";
      owo.forEach(q => (content += q.toString() + " | " + q.name + "\n"));
      embed.setDescription(content);
      msg.edit(embed);
   });
   forwards.on("collect", () => {
      if (page > Math.ceil(list.length / epg)) return;
      page++;
      msg.reactions.find(uwu => uwu.emoji.name == "➡")
         .remove(message.author);
      owo = list.slice((page - 1) * epg, page * epg);
      content = "";
      owo.forEach(q => (content += q.toString() + " | " + q.name + "\n"));
      embed.setDescription(content);
      msg.edit(embed);
   });
};
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: [
      "lsemote", "le"
   ],
   permLevel: "User"
};
exports.help = {
   name: "listemote",
   category: "Utility",
   description: "Sends an interactive emote list.",
   usage: "listemote"
};
