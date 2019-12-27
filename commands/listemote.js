const Discord = require('discord.js');
const {nsfw} = require('../config.json')

module.exports.run = async (client, message, args) => {
  let list = client.emojis.filter(x => !nsfw.includes(x.guild.id), this).array()
  let page = 1
  let epg = 20
  let content = ""
  const left = "⬅", right ="➡"
  var embed = new Discord.RichEmbed()
  .setTitle("**Emoji list!**")
  .setColor(message.guild.me.displayHexColor);
  
  let owo = list.slice((page - 1) * epg, page * epg);
  owo.forEach(q=>content+= q.toString() +" | "+q.name+"\n");
  embed.setDescription(content)
  let msg = await message.channel.send({ embed });
  if(list.length<epg) return;
  
  await msg.react("⬅");
  await msg.react("➡");
  const backwardsfilter = (reaction, user) => reaction.emoji.name == left && user.id == message.author.id;
  const forwardsfilter = (reaction, user) => reaction.emoji.name == right && user.id == message.author.id;
  const backwards = msg.createReactionCollector(backwardsfilter, {time: 300000});
  const forwards = msg.createReactionCollector(forwardsfilter, {time: 300000});

  backwards.on("collect", r => {
    if (page < 2) return;
    msg.reactions.find(uwu => (uwu.emoji.name = "⬅")).remove(message.author);
    page--;

    owo = list.slice((page - 1) * epg, page * epg);
    content=""
    owo.forEach(q=>content+= q.toString() +" | "+q.name+"\n");
    embed.setDescription(content)
    msg.edit(embed);
  });

  forwards.on("collect", r => {
    if (page > Math.ceil(list.length/epg)) return;
    page++;
    msg.reactions.find(uwu => uwu.emoji.name == "➡").remove(message.author);

    owo = list.slice((page - 1) * epg, page * epg);
    content=""
    owo.forEach(q=>content+= q.toString() +" | "+q.name+"\n");
    embed.setDescription(content)
    msg.edit(embed);
  });
}

module.exports.config = {
    name: "listemote",
    aliases: ["le"],
    usage: ".listemote",
    description: "Lists all available emotes.",
    accessibleby: "Members"
}