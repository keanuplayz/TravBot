module.exports.run =  (client, message, args) => {
  message.channel.send("https://github.com/keanuplayz/TravBot");
}

module.exports.config = {
    name: "code",
    noaliases: "No aliases",
    aliases: [],
    usage: ".code",
    description: "Gives you the GitHub link.",
    accessibleby: "Members"
}