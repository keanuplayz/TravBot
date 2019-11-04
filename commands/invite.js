module.exports.run =  (client, message, args) => {
  message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=606395763404046349&permissions=8&scope=bot");
}

module.exports.config = {
    name: "invite",
    noaliases: "No aliases",
    aliases: [],
    usage: ".invite",
    description: "Gives you the invite link.",
    accessibleby: "Members"
}