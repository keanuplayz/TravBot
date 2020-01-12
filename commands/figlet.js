
const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    const figlet = require('figlet');
    const input = args.join(" ");


    message.delete();
    if (!args[0]) return message.channel.send("You have to provide input for me to create a figlet!");
    message.channel.send("\`\`\`" +
        figlet.textSync(`${input}`, { horizontalLayout: 'full' }) +
    "\`\`\`");
    console.error();
}

module.exports.config = {
    name: "figlet",
    noalias: "No aliases",
    aliases: [],
    usage: ".figlet",
    description: "Sends a figlet of your input.",
    accessibleby: "Members"
}