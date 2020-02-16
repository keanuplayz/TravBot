const {ownerID} = require("../config.json");


module.exports.run = async (client, message, args) => {
    const channelID = args.join(" ");
    const channel = client.channels.get(channelID);
    channel.join().then(connection => {
    message.channel.send("Successfully connected.");
  })
}

module.exports.config = {
    name: "join",
    noalias: "No aliases",
    aliases: [],
    usage: ".join",
    description: "Joins the specified voice channel.",
    accessibleby: "Bot Owner"
}