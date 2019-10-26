const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  const file = new Discord.Attachment('assets/ravi2.png');

const exampleEmbed = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi2.png',
	},
};

message.channel.send({ files: [file], embed: exampleEmbed });
}

module.exports.config = {
    name: "ravi2",
    noaliases: "No aliases",
    aliases: [],
    usage: ".ravi2",
    description: "Ravioli ravioli...",
    accessibleby: "Members"
}