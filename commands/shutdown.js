const Discord = require('discord.js');
const botconfig = require("../config.json");

module.exports.run = async (bot, message, args) => {
	if (message.author.id != "465662909645848577") return message.channel.send("You are not the bot owner!")

	try {
		await message.channel.send("Bot is shutting down...")
		process.exit()
	} catch (e) {
		message.channel.send(`ERROR: ${e.message}`)
	}



}

module.exports.config = {
	name: "shutdown",
	aliases: ["sd"]
}