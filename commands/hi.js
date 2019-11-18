module.exports.run = async (client, message, args) => {
    if (message.author.id != 145839753118351360) {
			message.channel.send("Hello there.")
	} else {
		let sender = message.author
		let mention = message.mentions.users.first()

		if(!mention) return message.channel.send(":cookie: Here's a cookie!")
		if(mention.id == sender.id) return message.channel.send("You can't give yourself cookies!")
		message.channel.send(`:cookie: Lea gave <@${mention.id}> a cookie!`)
	}
}

module.exports.config = {
    name: "hi",
    noalias: "No aliases",
    aliases: [],
    usage: ".hi",
    description: "Command for Lea to give cookies.",
    accessibleby: "Members"
}
