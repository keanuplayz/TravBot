const {token, ownerID} = require("../config.json")
module.exports.run = async (client, message, args) => {
  if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
  message.channel.send("Restarting...")
    .then(msg => client.destroy())
    .then(() => new Promise((resolve) => setTimeout(resolve, 5000)))
    .then(() => client.login(token))
}

module.exports.config = {
    name: "restart",
    noaliases: "No aliases",
    aliases: [],
    usage: ".restart",
    description: "Restarts the bot.",
    accessibleby: "Bot Owner"
}
