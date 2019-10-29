const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
	if (!args.length || isNaN(args[0]) || args[0]<1 || args[0]>9) return message.channel.send(`Please provide a number between 1 and 9.`);
	let file = new Discord.Attachment(`assets/ravi${args[0]}.png`)
	const embed = {
		title: 'Ravioli ravioli...',
		image: {
			url: `attachment://ravi${args[0]}.png`,
		}
	}
    message.channel.send({ files: [file], embed: embed });
};

module.exports.config = {
    name: "ravi",
    noaliases: "No aliases",
    aliases: [],
    usage: ".ravi <number>",
    description: "Ravioli ravioli...",
    accessibleby: "Members"
}