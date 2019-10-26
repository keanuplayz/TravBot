const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix

module.exports.run = async (client, message, args) => {
  const file = new Discord.Attachment('assets/ravi6.png');

const exampleEmbed = {
	title: 'Ravioli ravioli...',
	image: {
		url: 'attachment://ravi6.png',
	},
};

message.channel.send({ files: [file], embed: exampleEmbed });
}

module.exports.config = {
    name: "ravi6",
    noaliases: "No aliases",
    aliases: [],
    usage: ".ravi6",
    description: "Ravioli ravioli...",
    accessibleby: "Members"
}