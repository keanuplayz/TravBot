exports.run = async (client, message, args) => {
  let fetched = client.active.get(message.guild.id) || undefined
  if (!fetched) return message.channel.send("There currently isn't any music playing in this server")
  if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Sorry, you currently aren't in the same channel as the bot.")
  let userCount = message.member.voiceChannel.members.size
  let required = Math.ceil(userCount / 2)

  if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = []
  if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`)
  fetched.queue[0].voteSkips.push(message.member.id)
  client.active.set(message.guild.id, fetched)

  if (fetched.queue[0].voteSkips.length >= required) {
    message.channel.send("Succesfully skipped song!")
    return fetched.dispatcher.emit('end')
  }
  message.channel.send(`Succesfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "skip",
  category: "Music",
  description: "Skips current song.",
  usage: "skip"
};