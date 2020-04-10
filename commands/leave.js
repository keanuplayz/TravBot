/* eslint-disable no-unused-vars */
exports.run = async (client, message, args, level) => {
  let fetched = client.active.get(message.guild.id) || undefined
  if (!fetched) return message.channel.send("There currently isn't any music playing in this guild!")
  if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Sorry, you aren't connected to the same channel.")
  //if (!fetched.dispatcher.paused) return message.channel.send("The music isn't paused.")
  const vc = message.guild.me.voiceChannel;
  if (vc) vc.leave();
  client.active.delete(message.guild.id)
  message.channel.send("Successfully disconnected.");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};
exports.help = {
  name: "leave",
  category: "Utility",
  description: "Leaves the current voice channel.",
  usage: "leave [channel id]"
};