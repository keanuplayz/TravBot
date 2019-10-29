
const {ownerID} = require("../config.json");

module.exports.run = async (bot, message, args) => {
	if (message.author.id != ownerID) return message.channel.send("You are not the bot owner!")
	try {
		await message.channel.send("Bot is shutting down...")
		process.exit()
	} catch (e) {
		message.channel.send(`ERROR: ${e.message}`)
	}
}

module.exports.config = {
    name: "shutdown",
    aliases: ["sd"],
    usage: ".shutdown",
    description: "Shuts down the bot.",
    accessibleby: "Bot Owner"
}