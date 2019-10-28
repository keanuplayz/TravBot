const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
    console.log("command called");

    if(message.content.startsWith(`${prefix}emote`)) {
        console.log("passed if")
        const emote = client.emojis.find(emote => emote.name === args[0]);
        
        if(emote) {
            message.delete();
            message.channel.send(`${emote}`);
        } else {
            message.channel.send("That's not a valid emote name!")
        }
        
    }

}

module.exports.config = {
    name: "emote",
    noaliases: "No aliases",
    aliases: [],
    usage: ".emote",
    description: "Sends the specified emote.",
    accessibleby: "Members"
}