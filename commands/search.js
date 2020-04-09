const search = require("yt-search");

exports.run = async (client, message, args) => {
  search(args.join(' '), function(err, res) {
    if (err) return message.channel.send("Sorry, something went wrong.")
    let videos = res.videos.slice(0, 10)
    let resp = ""
    for (var i in videos) {
      resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`
    }
    resp += `\nChoose a number between \`1-${videos.length}\``
    let results
    message.channel.send(resp).then(a => results = a)
    const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0 && message.author.id == m.author.id
    let collector = message.channel.createMessageCollector(filter)
    collector.videos = videos
    collector.once('collect', function(m) {
      results.delete()
      m.delete()
      let commandFile = require("./play.js")
      commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url])
    })
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};
exports.help = {
  name: "search",
  category: "Music",
  description: "Search the song in Youtube.",
  usage: "search [song name]"
};