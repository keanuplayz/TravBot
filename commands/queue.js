exports.run = async (client, message, args) => {
  const fetched = client.active.get(message.guild.id) || undefined;
  if (!fetched) return message.channel.send("There currently isn't any music playing in this guild.");
  const page = args[0] || 1;
  const queue = fetched.queue;
  if (isNaN(page) || page > Math.ceil(queue.length / 10) + 1 || page < 1) return message.channel.send("Please input a valid number.");
  const nowPlaying = queue[0];
  let resp = `__**Now Playing**__ \n**${nowPlaying.songTitle}** -- **Requested by:** *${nowPlaying.requester}*`;

  const lista = queue.slice((page - 1) * 10, (page * 10) + 1);

  for (var i = 1; i < lista.length; i++) {
    if (i == 1) resp += "\n\n__**Queue**__\n";
    resp += `${i}. **${lista[i].songTitle}** -- **Requested by:** *${lista[i].requester}*\n`;
  }
  return message.channel.send(resp);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "queue",
  category: "Music",
  description: "Pause the current song.",
  usage: "queue <page>"
};