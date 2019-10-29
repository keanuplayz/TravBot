module.exports.run = async (client, message, args) => {
  message.channel.send("Drink it. Hydration is key.");
}

module.exports.config = {
    name: "water",
    noaliases: "No aliases",
    aliases: [],
    usage: ".water",
    description: "Tells you to drink water.",
    accessibleby: "Members"
}