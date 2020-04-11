const ytdl = require("ytdl-core");
const ytdld = require("ytdl-core-discord");
exports.run = async (client, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");

  if (!args[0]) return message.channel.send("Sorry, please input a url. Usage: `.play <url>`");
  const validate = await ytdl.validateURL(args[0]);
  if (!validate) {
    const commandFile = require("./search.js");
    return commandFile.run(client, message, args);
  }
  const info = await ytdl.getBasicInfo(args[0]);
  const data = client.active.get(message.guild.id) || {};
  if (!data.connection) data.connection = await message.member.voiceChannel.join();
  if (!data.queue) data.queue = [];
  data.guildID = message.guild.id;
  data.queue.push({
    songTitle: info.player_response.videoDetails.title,
    requester: message.author.tag,
    url: args[0],
    announceChannel: message.channel.id
  });
  if (!data.dispatcher) play(client, data);
  else {
    message.channel.send(`Added to Queue: ${data.queue[data.queue.length-1].songTitle} | Requested by: ${message.author.tag}`);
  }
  client.active.set(message.guild.id, data);
};

async function play(client, data) {
  client.channels.get(data.queue[0].announceChannel).send(`Now Playing ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);
  data.dispatcher = await data.connection.playOpusStream(await ytdld(data.queue[0].url, {
    filter: "audioonly",
    highWaterMark: 1 << 25
  }));
  data.dispatcher.guildID = data.guildID;
  data.dispatcher.once("end", function() {
    finish(client, this);
  });
}

function finish(client, dispatcher) {
  const fetched = client.active.get(dispatcher.guildID);
  fetched.queue.shift();
  if (fetched.queue.length > 0) {
    client.active.set(dispatcher.guildID, fetched);
    play(client, fetched);
  } else {
    client.active.delete(dispatcher.guildID);
    const vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
    if (vc) vc.leave();
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "play",
  category: "Music",
  description: "Plays a song in the current voice channel.",
  usage: "play <url>"
};