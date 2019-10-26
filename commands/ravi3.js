const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  const file = new Discord.Attachment('assets/ravi3.png');

const exampleEmbed = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi3.png',
	},
};

message.channel.send({ files: [file], embed: exampleEmbed });
}

module.exports.config = {
    name: "ravi3",
    noaliases: "No aliases",
    aliases: [],
    usage: ".ravi3",
    description: "Ravioli ravioli...",
    accessibleby: "Members"
}