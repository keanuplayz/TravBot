/* eslint-disable no-unused-vars */
exports.run = (client, message, args) => {
  const fetched = client.active.get(message.guild.id) || undefined;
  if (!fetched) return message.channel.send("There currently isn't any music playing in this guild!");
  if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Sorry, you aren't connected to the same channel.");
  if (fetched.dispatcher.paused) return message.channel.send("The music is already paused.");

  fetched.dispatcher.pause();
  message.channel.send(`Succesfully paused ${fetched.queue[0].songTitle}`);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "pause",
  category: "Music",
  description: "Pause the current song.",
  usage: "pause"
};