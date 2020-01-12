const Discord = require('discord.js');
const math = require('mathjs');

module.exports.run = async (client, message, args) => {
	if(!args[0]) return message.channel.send("Please provide a calculation.")

	let resp;
	try {
		resp = math.evaluate(args.join(' '));
	} catch (e) {
		return message.channel.send('Please provide a *valid* calculation.')
	}

	const embed = new Discord.RichEmbed()
		.setColor(0xffffff)
		.setTitle("Math Calculation")
		.addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
		.addField('Output', `\`\`\`js\n${resp}\`\`\``)
	
	message.channel.send(embed)
}

module.exports.config = {
	name: "calc",
	noaliases: "No aliases",
	aliases: [],
	usage: ".calc",
	description: "Calculates a specified math expression.",
	accessibleby: "Members"
}